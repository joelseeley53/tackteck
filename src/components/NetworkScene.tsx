import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Quaternion, Vector3, type Group } from "three";

const nodes = [
  [-2.8, 0.8, 0],
  [-1.8, 1.45, -0.15],
  [-0.7, 0.95, 0.12],
  [0.45, 1.55, -0.1],
  [1.6, 0.95, 0.08],
  [2.75, 1.4, -0.12],
  [-2.35, -0.55, 0.08],
  [-1.1, -0.3, -0.1],
  [0.1, -0.75, 0.12],
  [1.35, -0.3, -0.05],
  [2.45, -0.75, 0.1],
  [-1.8, -1.7, -0.1],
  [-0.45, -1.55, 0.08],
  [0.9, -1.85, -0.12],
  [2.1, -1.55, 0.1],
] as const;

const links = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5],
  [0, 6], [1, 6], [1, 7], [2, 7], [2, 8], [3, 8], [3, 9], [4, 9], [4, 10], [5, 10],
  [6, 7], [7, 8], [8, 9], [9, 10],
  [6, 11], [7, 11], [7, 12], [8, 12], [8, 13], [9, 13], [9, 14], [10, 14],
  [11, 12], [12, 13], [13, 14],
] as const;

function readColorToken(token: string) {
  const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
  const canvas = document.createElement("canvas");
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext("2d");
  if (!context || !value) return "white";
  context.fillStyle = "black";
  context.fillStyle = value;
  context.fillRect(0, 0, 1, 1);
  const [red, green, blue] = context.getImageData(0, 0, 1, 1).data;
  return `rgb(${red}, ${green}, ${blue})`;
}

function Network() {
  const group = useRef<Group>(null);
  const colors = useMemo(() => ({ gold: readColorToken("--gold"), white: readColorToken("--on-navy") }), []);

  useFrame(({ clock }) => {
    if (group.current) group.current.rotation.y = Math.sin(clock.elapsedTime * 0.14) * 0.035;
  });

  return (
    <group ref={group} position={[0.1, 0, 0]}>
      {links.map(([start, end]) => {
        const from = new Vector3(...nodes[start]);
        const to = new Vector3(...nodes[end]);
        const direction = new Vector3().subVectors(to, from);
        const midpoint = new Vector3().addVectors(from, to).multiplyScalar(0.5);
        const quaternion = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), direction.clone().normalize());
        return (
          <mesh key={`${start}-${end}`} position={midpoint} quaternion={quaternion}>
            <cylinderGeometry args={[0.009, 0.009, direction.length(), 5]} />
            <meshBasicMaterial color={colors.white} transparent opacity={0.2} />
          </mesh>
        );
      })}
      {nodes.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[index % 4 === 0 ? 0.055 : 0.035, 12, 12]} />
          <meshBasicMaterial color={index % 4 === 0 ? colors.gold : colors.white} transparent opacity={index % 4 === 0 ? 0.82 : 0.48} />
        </mesh>
      ))}
    </group>
  );
}

export default function NetworkScene() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 opacity-60" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 8], fov: 42 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: true }}>
        <Network />
      </Canvas>
    </div>
  );
}