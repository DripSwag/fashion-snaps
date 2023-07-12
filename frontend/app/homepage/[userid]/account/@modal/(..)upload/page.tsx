import FileInput from "./FileInput";
import BackButton from "../BackButton";

export default function Upload({ params }: { params: { userid: string } }) {
  return (
    <div className="w-screen h-screen bg-[#61616199] fixed top-0 left-0">
      <div className="w-1/2 h-3/4 bg-white relative left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 p-2">
        <BackButton />
        <FileInput userId={params.userid} />
      </div>
    </div>
  );
}
