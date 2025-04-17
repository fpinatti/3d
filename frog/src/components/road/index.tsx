export const Road = ({ position = [0, 0, 0] }) => {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[15, 10]} />
      <meshStandardMaterial color="#333333" />
    </mesh>
  );
};