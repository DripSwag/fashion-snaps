export default function Post({ img, id }: { img: string; id: number }) {
  return (
    <div key={id}>
      <img src={"http://127.0.0.1:8000" + img}></img>
    </div>
  );
}
