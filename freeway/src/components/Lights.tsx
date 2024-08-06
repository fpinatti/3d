const Lights = () => {
  return (
    <>
      <fog attach="fog" color={'#ffffff'} near={10} far={40} />
      <color attach="background" args={['#ffffff']} />
      <directionalLight
        position={[13, 40, -13]}
        castShadow
        intensity={1}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-camera-top={50}
        shadow-camera-right={50}
        shadow-camera-bottom={-50}
        shadow-camera-left={-50}
      />
      <ambientLight intensity={0.04} />
    </>
  )
}

export default Lights
