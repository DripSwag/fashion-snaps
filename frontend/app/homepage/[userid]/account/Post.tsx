export default function Post({ img, id }: { img: string; id: number }) {
  return (
    <div className="w-1/3 h-fit pb-24 pt-4 bg-[#F8F8FF] relative hover:drop-shadow-xl hover:scale-105">
      <img
        src={"http://127.0.0.1:8000" + img}
        className="aspect-auto w-[80%] relative left-1/2 -translate-x-1/2"
      ></img>
    </div>
  );
}
