import ImageCompressView from "@/components/shared/views/image-processing-view/ImageCompressView";
import ImageTransformView from "@/components/shared/views/image-processing-view/ImageTransformView";
import Tabs from "@/components/shared/Tabs";

const tabs = [
  {
    title: "Compress Image",
    content: <ImageCompressView />,
  },
  {
    title: "Transform Image",
    content: <ImageTransformView />,
  },
];
export default function ImagePage() {
  return (
    <section className="min-h-screen p-4 w-full">
      <div className=" p-10 w-full flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Image Processing</h1>
        <Tabs tabs={tabs} />
      </div>
    </section>
  );
}
