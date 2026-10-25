interface Params {
  color: string;
}

export default function Triangle({ color }: Params) {
  return <div className="triangle" style={{ backgroundColor: color }}></div>;
}
