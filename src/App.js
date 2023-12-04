import "./App.css";
import { Canvas, useThree } from "@react-three/fiber";
import { KiwiModel } from "./KiwiModel";
import {
  Box,
  ContactShadows,
  Float,
  OrbitControls,
  Sky,
  Sparkles,
  Stars,
  StatsGl,
} from "@react-three/drei";
import { Leva, button, folder, useControls } from "leva";

function Controls() {
  const {
    camera,
    gl: { domElement },
  } = useThree();
  return <OrbitControls args={[camera, domElement]} />;
}

function App() {
  const [{ scale, color, wireframe, position }, set] = useControls(
    "Canvas",
    () => ({
      transform: folder({
        position: [0, -1.5, 0],
        scale: {
          value: 1,
          min: 0.4,
          max: 1,
          step: 0.1,
          onChange: (val) => {
            console.log(val);
          },
        },
        material: folder({
          color: "#fff",
          wireframe: false,
        }),
        reset: button(() => {
          set({
            scale: 1,
            position: [0, -1.5, 0],
            color: "#fff",
            wireframe: false,
          });
        }),
      }),
    })
  );

  return (
    <div className="App">
      <Leva collapsed />
      {/* <Leva hidden /> */}
      <Canvas>
        <ambientLight />
        <pointLight position={[1, 2, 2]} intensity={5} />

        <Box args={[4, 1, 4]} scale={scale} position={position}>
          <meshStandardMaterial color={color} wireframe={wireframe} />
        </Box>

        <Float
          speed={15}
          rotationIntensity={1.2}
          floatIntensity={1}
          floatingRange={[1, 1.8]}
        >
          <KiwiModel scale={20} />
        </Float>
        <ContactShadows position={[0.05, -0.9, 0.1]} blur={4} />

        <Sky sunPosition={[0, -2, 0]} />
        <Sparkles size={2} scale={10} />
        <Stars count={200} radius={200} />
        <spotLight
          position={[0, 2, 2]}
          color="green"
          angle={90}
          decay={0}
          intensity={30}
        />
        <spotLight
          position={[0, 2, -2]}
          color="red"
          angle={90}
          decay={0}
          intensity={10}
        />

        <Controls />
        <StatsGl />
      </Canvas>
    </div>
  );
}

export default App;
