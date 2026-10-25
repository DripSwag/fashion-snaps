interface Params {
  color: string;
}

export default function Circle({ color }: Params) {
  return (
    <div
      className="w-full h-full aspect-square rounded-full"
      style={{ backgroundColor: color }}
    />
  );
}
