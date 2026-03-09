"use client";
/**
 * Timeline/index.tsx — Three.js spiral timeline
 *
 * Fixes applied vs original:
 * ① WebGL context: try WebGL2 → WebGL1 → bail gracefully.
 * ② _dummy rotation bug: setFromRotationMatrix instead of stale Euler.
 * ③ Texture GPU leak: dispose() every texture on cleanup.
 * ④ bendCard skip: skip GPU upload when bend delta < 0.001.
 * ⑤ Double first-render: RAF-only loop start.
 * ⑥ lookAt NaN guard: lookahead clamped to 0.999.
 * ⑦ focusIdx fallback: sidebar never freezes.
 * ⑧ ResizeObserver instead of window resize.
 * ⑨ rafId initialised to 0.
 *
 * NEW — Parallax tilt effect (⑩):
 * Mouse move over the right-side canvas tilts the focused card in 3D
 * (rotateX / rotateY driven by normalised cursor offset).
 * A UV-offset layer shifts the texture's sampling origin producing the
 * background-parallax depth seen in the CodePen reference.
 * All tilt state lives in plain refs — zero extra React renders per frame.
 * On mouse-leave the tilt springs back to neutral each tick.
 */
import "./timeline.css";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionLabel from "@/components/ui/SectionLabel";
import { START_YEAR, TOTAL, TIMELINE_DATA, IMAGES } from "./timelineConstants";

/* ─────────────────────────────────────────────
   TEXTURE CACHE  (module-level — survives re-renders)
───────────────────────────────────────────── */
const textureCache = new Map<string, THREE.CanvasTexture>();

function getTexture(
  index: number,
  focused: boolean,
  maxAniso = 16,
): THREE.CanvasTexture {
  const key = `${index}-${focused ? "f" : "b"}`;
  if (textureCache.has(key)) return textureCache.get(key)!;

  const W = focused ? 820 : 512;
  const H = 716;
  const CRN = 28;

  // Render at 2× physical pixels for crisp 4K-quality textures on HiDPI screens
  const DPR = Math.min(
    typeof window !== "undefined" ? window.devicePixelRatio : 2,
    2,
  );
  const canvas = document.createElement("canvas");
  canvas.width = W * DPR;
  canvas.height = H * DPR;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(DPR, DPR);
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  function angular(w: number, h: number, r: number) {
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(w - r, 0);
    ctx.lineTo(w, r);
    ctx.lineTo(w, h - r);
    ctx.lineTo(w - r, h);
    ctx.lineTo(r, h);
    ctx.lineTo(0, h - r);
    ctx.lineTo(0, r);
    ctx.closePath();
  }

  // Skeleton while image loads
  angular(W, H, CRN);
  ctx.fillStyle = "rgba(13,13,13,0.97)";
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = "rgba(255,160,66,0.25)";
  ctx.font = "600 11px sans-serif";
  ctx.textAlign = "center";
  ctx.letterSpacing = "0.2em";
  ctx.fillText("LOADING", W / 2, H / 2);

  const texture = new THREE.CanvasTexture(canvas);
  // Canvas is drawn at DPR× resolution — set repeat/offset to compensate
  // so UV coordinates (0→1) still map to the full logical card dimensions.
  // No repeat is set (default 1,1) so this is handled automatically by Three.js
  // reading the full canvas pixels.
  texture.anisotropy = maxAniso; // maximise texture sharpness at oblique angles
  textureCache.set(key, texture);

  const img = new Image();
  img.crossOrigin = "anonymous";
  img.src = IMAGES[index % IMAGES.length];

  img.onload = () => {
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.clearRect(0, 0, W, H);
    angular(W, H, CRN);
    ctx.fillStyle = "rgba(13,13,13,0.97)";
    ctx.fill();

    const IS = W - 50,
      IX = 25,
      IY = 22,
      IR = 16;

    // Clipped + graded photo
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(IX + IR, IY);
    ctx.lineTo(IX + IS - IR, IY);
    ctx.lineTo(IX + IS, IY + IR);
    ctx.lineTo(IX + IS, IY + IS - IR);
    ctx.lineTo(IX + IS - IR, IY + IS);
    ctx.lineTo(IX + IR, IY + IS);
    ctx.lineTo(IX, IY + IS - IR);
    ctx.lineTo(IX, IY + IR);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(img, IX, IY, IS, IS);
    ctx.restore();

    // Photo border
    ctx.beginPath();
    ctx.moveTo(IX + IR, IY);
    ctx.lineTo(IX + IS - IR, IY);
    ctx.lineTo(IX + IS, IY + IR);
    ctx.lineTo(IX + IS, IY + IS - IR);
    ctx.lineTo(IX + IS - IR, IY + IS);
    ctx.lineTo(IX + IR, IY + IS);
    ctx.lineTo(IX, IY + IS - IR);
    ctx.lineTo(IX, IY + IR);
    ctx.closePath();
    ctx.strokeStyle = "rgba(255,255,255,0.12)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Year gradient
    const yr = START_YEAR + index;
    const gYr = ctx.createLinearGradient(IX, 0, IX + 180, 0);
    gYr.addColorStop(0, "#ffa042");
    gYr.addColorStop(1, "#ff6971");
    ctx.fillStyle = gYr;
    ctx.font = "bold 52px sans-serif";
    ctx.textAlign = "left";
    ctx.letterSpacing = "0";
    ctx.fillText(String(yr), IX, IY + IS + 58);

    // Accent bar
    const gBar = ctx.createLinearGradient(IX, 0, IX + 180, 0);
    gBar.addColorStop(0, "#ffa042");
    gBar.addColorStop(1, "#ff6971");
    ctx.fillStyle = gBar;
    ctx.fillRect(IX, IY + IS + 66, 160, 2);

    // Index chip
    ctx.fillStyle = "rgba(255,255,255,0.32)";
    ctx.font = "600 12px sans-serif";
    ctx.fillText(`No. ${String(index + 1).padStart(2, "0")}`, IX, IY + IS + 90);

    // Outer border
    angular(W, H, CRN);
    ctx.strokeStyle = focused
      ? "rgba(255,160,66,0.38)"
      : "rgba(255,255,255,0.1)";
    ctx.lineWidth = focused ? 2 : 1.5;
    ctx.stroke();

    // Top accent on focused card
    if (focused) {
      const gTop = ctx.createLinearGradient(0, 0, W, 0);
      gTop.addColorStop(0, "transparent");
      gTop.addColorStop(0.4, "rgba(255,160,66,0.7)");
      gTop.addColorStop(0.6, "rgba(255,105,113,0.7)");
      gTop.addColorStop(1, "transparent");
      ctx.strokeStyle = gTop;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(CRN, 1);
      ctx.lineTo(W - CRN, 1);
      ctx.stroke();
    }

    texture.needsUpdate = true;
  };

  return texture;
}

/* ─────────────────────────────────────────────
   COMPONENT
───────────────────────────────────────────── */
export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeYear, setActiveYear] = useState(START_YEAR);
  const [activeTitle, setActiveTitle] = useState(TIMELINE_DATA[0].t);
  const [activeDesc, setActiveDesc] = useState(TIMELINE_DATA[0].d);
  const [textVisible, setTextVisible] = useState(true);

  const targetRef = useRef(0);
  const activeRef = useRef(-1);

  /* ── ⑩ Parallax tilt state — plain refs, zero extra renders ── */
  const mouseRef = useRef<{ nx: number; ny: number } | null>(null);
  const tiltRef = useRef({ rx: 0, ry: 0 }); // smoothed tilt angles (deg)
  const uvRef = useRef({ ox: 0, oy: 0 }); // smoothed UV offset (0-1 fraction)

  const go = (dir: number) =>
    setCurrentIndex((p) => Math.max(0, Math.min(TOTAL - 1, p + dir)));

  useEffect(() => {
    targetRef.current = currentIndex / TOTAL;
  }, [currentIndex]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    /* ── ① WebGL context — WebGL2 → WebGL1 → bail ── */
    let renderer: THREE.WebGLRenderer | undefined;
    const commonOpts: THREE.WebGLRendererParameters = {
      antialias: true,
      alpha: true,
    };

    try {
      renderer = new THREE.WebGLRenderer(commonOpts);
    } catch {
      try {
        const canvas = document.createElement("canvas");
        canvas.getContext("webgl", { failIfMajorPerformanceCaveat: false });
        renderer = new THREE.WebGLRenderer({ ...commonOpts, canvas });
      } catch {
        return;
      }
    }
    if (!renderer) return;

    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0d0d0d, 1);
    // Cache the GPU's max anisotropy so getTexture() can use it
    const maxAniso = renderer.capabilities.getMaxAnisotropy();
    el.appendChild(renderer.domElement);

    /* ── Scene / Camera ── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0d0d0d, 0.038);
    const camera = new THREE.PerspectiveCamera(
      45,
      el.clientWidth / el.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0, 16);

    /* ── Spiral curve ── */
    const curvePts: THREE.Vector3[] = [];
    for (let i = 0; i <= 400; i++) {
      const t = i / 400;
      const angle = t * Math.PI * 2 * 4;
      const r = 0.5 + Math.pow(t, 1.1) * 7;
      curvePts.push(
        new THREE.Vector3(
          Math.cos(angle) * r,
          Math.sin(angle) * r,
          t * 60 - 60,
        ),
      );
    }
    const curve = new THREE.CatmullRomCurve3(curvePts);

    /* ── Geometry pools ── */
    const TUBE_R = 1.5;
    const _baseProto = new THREE.PlaneGeometry(2, 2.8, 10, 10);
    const _focusProto = new THREE.PlaneGeometry(3.2, 2.8, 10, 10);

    const basePts = Array.from(
      { length: _baseProto.attributes.position.count },
      (_, i) =>
        new THREE.Vector3(
          _baseProto.attributes.position.getX(i),
          _baseProto.attributes.position.getY(i),
          0,
        ),
    );
    const focusPts = Array.from(
      { length: _focusProto.attributes.position.count },
      (_, i) =>
        new THREE.Vector3(
          _focusProto.attributes.position.getX(i),
          _focusProto.attributes.position.getY(i),
          0,
        ),
    );

    const baseGeos: THREE.PlaneGeometry[] = Array.from(
      { length: TOTAL },
      () => _baseProto.clone() as THREE.PlaneGeometry,
    );
    const focusGeos: THREE.PlaneGeometry[] = Array.from(
      { length: TOTAL },
      () => _focusProto.clone() as THREE.PlaneGeometry,
    );

    _baseProto.dispose();
    _focusProto.dispose();

    /* ── bendCard ── */
    const prevBend = new Float32Array(TOTAL).fill(1);

    function bendCard(
      pos: THREE.BufferAttribute | THREE.InterleavedBufferAttribute,
      pts: THREE.Vector3[],
      factor: number,
      cardIdx: number,
    ) {
      if (Math.abs(factor - prevBend[cardIdx]) < 0.001) return;
      prevBend[cardIdx] = factor;
      for (let i = 0; i < pts.length; i++) {
        const v = pts[i];
        const angle = v.x / TUBE_R;
        pos.setXYZ(
          i,
          v.x + (TUBE_R * Math.sin(angle) - v.x) * factor,
          v.y,
          v.z + (TUBE_R * (1 - Math.cos(angle)) - v.z) * factor,
        );
      }
      pos.needsUpdate = true;
    }

    /* ── Card objects ── */
    type Card = {
      mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
      index: number;
      baseOffset: number;
      rotOffset: number;
      t: number;
      bend: number;
      isFocused: boolean;
    };

    const cards: Card[] = Array.from({ length: TOTAL }, (_, i) => {
      const mat = new THREE.MeshBasicMaterial({
        map: getTexture(i, false, maxAniso),
        side: THREE.DoubleSide,
        transparent: true,
      });
      const mesh = new THREE.Mesh(baseGeos[i], mat);
      scene.add(mesh);
      return {
        mesh,
        index: i,
        baseOffset: i / TOTAL,
        rotOffset: i * 60 * (Math.PI / 180),
        t: i / TOTAL,
        bend: 1,
        isFocused: false,
      };
    });

    /* ── Scratch objects (zero GC per frame) ── */
    const _q = new THREE.Quaternion();
    const _qTilt = new THREE.Quaternion(); // ⑩ tilt composition scratch
    const _eTilt = new THREE.Euler(); // ⑩ tilt euler scratch
    const _e = new THREE.Euler();
    const _v = new THREE.Vector3();
    const _vTgt = new THREE.Vector3();
    const _vScl = new THREE.Vector3();
    const _dummy = new THREE.Object3D();
    const _mat4 = new THREE.Matrix4();
    const _offset = new THREE.Vector3(-3.5, 2.0, 0);

    let scrollPos = 0;
    let rafId = 0;

    /* ── ⑩ Mouse listeners ─────────────────────────────────────────────
       Tilt activates only when cursor is over the right 56% (Three.js side).
       All reads happen inside tick() from refs — no per-event React state.
    ─────────────────────────────────────────────────────────────────── */
    const TILT_MAX_DEG = 12; // peak tilt in each axis (degrees)
    const UV_SHIFT = 0.04; // peak UV offset (fraction of texture space)

    function onMouseMove(e: MouseEvent) {
      const rect = el.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const W = rect.width;
      const H = rect.height;

      // Deactivate when hovering over the sidebar
      if (px < W * 0.44) {
        mouseRef.current = null;
        return;
      }

      // Normalise to [-1, 1] within the right panel
      const rightW = W * 0.56;
      const rightL = W * 0.44;
      const nx = ((px - rightL) / rightW) * 2 - 1; // -1 left → +1 right
      const ny = (py / H) * 2 - 1; // -1 top  → +1 bottom

      mouseRef.current = { nx, ny };
    }

    function onMouseLeave() {
      mouseRef.current = null;
    }

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseleave", onMouseLeave);

    /* ── Tick ── */
    function tick() {
      rafId = requestAnimationFrame(tick);
      scrollPos += (targetRef.current - scrollPos) * 0.3;

      // Focus zone
      let focusIdx = -1,
        maxT = -1;
      let fallbackIdx = -1,
        fallbackT = -1;

      for (const c of cards) {
        let t = (c.baseOffset + scrollPos) % 1;
        if (t < 0) t += 1;
        c.t = t;
        if (t > 0.84 && t < 0.98 && t > maxT) {
          maxT = t;
          focusIdx = c.index;
        }
        if (t > fallbackT) {
          fallbackT = t;
          fallbackIdx = c.index;
        }
      }
      if (focusIdx === -1) focusIdx = fallbackIdx;

      // Sidebar update
      if (focusIdx !== -1 && focusIdx !== activeRef.current) {
        activeRef.current = focusIdx;
        setTextVisible(false);
        setTimeout(() => {
          setActiveYear(START_YEAR + focusIdx);
          setActiveTitle(TIMELINE_DATA[focusIdx].t);
          setActiveDesc(TIMELINE_DATA[focusIdx].d);
          setTextVisible(true);
        }, 110);
      }

      /* ── ⑩ Smooth tilt & UV toward mouse target (or spring to 0) ── */
      const TILT_LERP = 0.08; // spring stiffness — lower = smoother/slower
      const mouse = mouseRef.current;

      if (mouse) {
        // rX: cursor below centre → card tilts top toward viewer (positive pitch)
        // rY: cursor right of centre → card tilts right toward viewer (positive yaw)
        // This is the "normal" mode from the CodePen: card leans away from cursor
        const tgtRx = mouse.ny * TILT_MAX_DEG;
        const tgtRy = -mouse.nx * TILT_MAX_DEG;
        // UV shifts opposite to tilt — image appears to have real depth
        const tgtOx = mouse.nx * UV_SHIFT;
        const tgtOy = -mouse.ny * UV_SHIFT;

        tiltRef.current.rx += (tgtRx - tiltRef.current.rx) * TILT_LERP;
        tiltRef.current.ry += (tgtRy - tiltRef.current.ry) * TILT_LERP;
        uvRef.current.ox += (tgtOx - uvRef.current.ox) * TILT_LERP;
        uvRef.current.oy += (tgtOy - uvRef.current.oy) * TILT_LERP;
      } else {
        // Spring back to neutral on mouse-leave
        tiltRef.current.rx *= 1 - TILT_LERP * 2;
        tiltRef.current.ry *= 1 - TILT_LERP * 2;
        uvRef.current.ox *= 1 - TILT_LERP * 2;
        uvRef.current.oy *= 1 - TILT_LERP * 2;
      }

      // Camera-space metrics
      const dist = camera.position.z - 10;
      const vFOV = THREE.MathUtils.degToRad(camera.fov);
      const vh = 2 * Math.tan(vFOV / 2) * dist;
      const vw = vh * camera.aspect;
      const scale = Math.min(1.2, (vh - 1.0) / 2.8);
      const targetX = Math.min(vw * 0.25, vw / 2 - (2 * scale) / 2 - 0.5);

      for (const c of cards) {
        const focused = c.index === focusIdx;

        // Geometry + texture swap
        if (focused !== c.isFocused) {
          c.isFocused = focused;
          c.mesh.geometry = focused ? focusGeos[c.index] : baseGeos[c.index];
          c.mesh.material.map = getTexture(c.index, focused, maxAniso);
          c.mesh.material.needsUpdate = true;
          prevBend[c.index] = -999;
        }

        const LP = 0.32;

        if (focused) {
          _vTgt.set(targetX, 0, 10);
          c.mesh.position.lerp(_vTgt, LP);

          // Base orientation (slight inward y-rotate)
          _e.set(0, -0.18, 0);
          _q.setFromEuler(_e);

          // ⑩ Compose tilt quaternion on top of base orientation (YXZ order)
          _eTilt.set(
            THREE.MathUtils.degToRad(tiltRef.current.rx),
            THREE.MathUtils.degToRad(tiltRef.current.ry),
            0,
            "YXZ",
          );
          _qTilt.setFromEuler(_eTilt);
          _q.multiply(_qTilt);

          c.mesh.quaternion.slerp(_q, LP);
          _vScl.set(scale, scale, scale);
          c.mesh.scale.lerp(_vScl, LP);
          c.bend += (0 - c.bend) * 0.3;
          c.mesh.material.opacity = 1;

          // ⑩ UV offset — shifts texture origin for depth parallax
          // Three.js Texture.offset is picked up automatically each frame
          if (c.mesh.material.map) {
            c.mesh.material.map.offset.set(uvRef.current.ox, uvRef.current.oy);
          }
        } else {
          const pt = curve.getPointAt(c.t);
          _dummy.position.copy(pt).add(_offset);

          // ⑥ Clamped lookahead — prevents NaN quaternion when t ≈ 1
          const tAhead = Math.min(c.t + 0.01, 0.999);
          _v.copy(curve.getPointAt(tAhead)).add(_offset);
          _dummy.lookAt(_v);
          _dummy.rotateZ(c.t * Math.PI * 4 + c.rotOffset);
          _dummy.translateX(TUBE_R + 0.1);
          _dummy.rotateY(Math.PI / 2);
          _dummy.updateMatrix();

          _v.setFromMatrixPosition(_dummy.matrix);
          c.mesh.position.lerp(_v, LP);

          // ② Extract quaternion from composed matrix — avoids stale Euler
          _mat4.extractRotation(_dummy.matrix);
          _q.setFromRotationMatrix(_mat4);
          c.mesh.quaternion.slerp(_q, LP);

          const ts = 0.2 + c.t * c.t * 0.8;
          _vScl.set(ts, ts, ts);
          c.mesh.scale.lerp(_vScl, LP);
          c.bend += (1 - c.bend) * 0.3;
          c.mesh.material.opacity =
            c.t < 0.1 ? c.t / 0.1 : c.t > 0.95 ? (1 - c.t) / 0.05 : 1;

          // Reset UV when card leaves focus
          if (c.mesh.material.map) {
            c.mesh.material.map.offset.set(0, 0);
          }
        }

        bendCard(
          c.mesh.geometry.attributes.position,
          c.isFocused ? focusPts : basePts,
          c.bend,
          c.index,
        );
      }

      renderer!.render(scene, camera);
    }

    // ⑤ Start loop via RAF only — no bare synchronous tick() call
    rafId = requestAnimationFrame(tick);

    /* ── ⑧ ResizeObserver ── */
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer!.setSize(el.clientWidth, el.clientHeight);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(el);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseleave", onMouseLeave);

      // ③ Dispose every cached texture to free GPU memory
      textureCache.forEach((tex) => tex.dispose());
      textureCache.clear();

      for (const c of cards) {
        c.mesh.material.map?.dispose();
        c.mesh.material.dispose();
      }
      baseGeos.forEach((g) => g.dispose());
      focusGeos.forEach((g) => g.dispose());
      renderer!.dispose();
      if (el.contains(renderer!.domElement))
        el.removeChild(renderer!.domElement);
    };
  }, []);

  /* ── JSX ── */
  return (
    <div className="relative w-full h-screen bg-[#0d0d0d] text-white overflow-hidden">
      {/* Ambient glows */}
      <div
        className="tl-float absolute top-[18%] right-[8%] w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "rgba(255,160,66,0.07)", filter: "blur(100px)" }}
        aria-hidden
      />
      <div
        className="tl-float-delay absolute bottom-[25%] left-[12%] w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "rgba(255,105,113,0.07)", filter: "blur(90px)" }}
        aria-hidden
      />

      {/* Section label */}
      <div className="absolute top-8 left-0 right-0 px-[6vw] z-20 pointer-events-none">
        <SectionLabel label="Our Journey" />
      </div>

      {/* Sidebar ── left 44% */}
      <div className="absolute inset-0 flex pointer-events-none z-10">
        <div className="w-[44%] h-full flex flex-col justify-center pl-[6vw] pr-6">
          <div className={textVisible ? "tl-text-in" : "tl-text-out"}>
            {/* Year row */}
            <div className="flex items-center gap-3 mb-4">
              <div className="tl-year-line" />
              <span className="text-[#ffa042] text-sm tracking-[.3em] font-bold">
                {activeYear}
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-extrabold tracking-tight leading-none mb-5 bg-gradient-to-br from-white via-white to-white/75 bg-clip-text text-transparent"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              {activeTitle}
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg leading-[1.75] text-white/55 font-light max-w-[88%]">
              {activeDesc}
            </p>

            {/* Progress */}
            <div className="flex items-center gap-2 mt-6">
              <span className="text-xs text-white/25 font-semibold tracking-widest">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 max-w-[120px] h-px bg-white/10 relative overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#ffa042] to-[#ff6971] transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / TOTAL) * 100}%` }}
                />
              </div>
              <span className="text-xs text-white/25 font-semibold tracking-widest">
                {String(TOTAL).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-3 mt-10 pointer-events-auto">
            <button
              onClick={() => go(-1)}
              disabled={currentIndex === 0}
              className="tl-clip-btn tl-nav-btn"
              aria-label="Previous milestone"
            >
              <div className="tl-nav-btn-hover" aria-hidden />
              <ChevronLeft className="w-4 h-4 relative z-10" />
              <span className="relative z-10">PREV</span>
            </button>

            <button
              onClick={() => go(1)}
              disabled={currentIndex === TOTAL - 1}
              className="tl-clip-btn tl-nav-btn"
              aria-label="Next milestone"
            >
              <div className="tl-nav-btn-hover" aria-hidden />
              <span className="relative z-10">NEXT</span>
              <ChevronRight className="w-4 h-4 relative z-10" />
            </button>
          </div>

          {/* Dot nav */}
          <div className="flex gap-1.5 mt-5 pointer-events-auto flex-wrap max-w-[260px]">
            {Array.from({ length: TOTAL }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`tl-dot ${i === currentIndex ? "tl-dot-active" : "tl-dot-inactive"}`}
                aria-label={`Go to ${START_YEAR + i}`}
              />
            ))}
          </div>
        </div>

        {/* Right half — Three.js canvas territory */}
        <div className="w-[56%] h-full" />
      </div>

      {/* Three.js mount */}
      <div ref={containerRef} className="absolute inset-0 z-0" />
    </div>
  );
}
