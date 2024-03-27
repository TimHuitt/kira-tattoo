import Image from "next/image";


export default function Booking() {
  return (
    <>
      <div className="relative z-30">
        <h1 className="text-4xl text-center pb-10">Booking</h1>
        <p>
        Sapien, pulvinar nostra integer sociosqu dignissim ultrices tincidunt ad penatibus sed! Mus porttitor felis et; pellentesque diam. Blandit quisque, posuere pretium vivamus. Metus urna mattis taciti pharetra nascetur maecenas. Justo placerat lacus ipsum. Ad sed ante eu eleifend massa aenean aptent curae; justo placerat. Proin sollicitudin dui dictum parturient fusce felis ad felis montes. Ante arcu porta laoreet; mus porttitor eros cras arcu vestibulum imperdiet. Tempor primis molestie nisl litora rhoncus. Mus commodo taciti fames. Tortor tincidunt nascetur ac netus curabitur nisl volutpat varius.
        </p>
      </div>
      <div className="absolute w-60 h-60 top-4 right-0 z-10 rotate-180">
        <Image
          src="corner.svg"
          alt=""
          fill
          className="max-w-60 max-h-60"
        />
      </div>
    </>
  );
}
