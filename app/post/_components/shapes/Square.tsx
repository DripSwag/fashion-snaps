interface Params {
  color: string;
}

export default function Square({ color }: Params) {
  return (
    <div className="w-full h-full" style={{ backgroundColor: color }}></div>
  );
}
