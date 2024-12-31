"use client";
import { useClientTranslation } from "@/hooks/global/use-client-translation";
import MP3Player from "@/components/mp3-player";
import { Button } from "@/components/ui/button";
import { ImVolumeIncrease } from "react-icons/im";
import { FaRegDotCircle } from "react-icons/fa";

const AudioRecordTab = () => {
  const { t } = useClientTranslation();

  return (
    <>
      <div className="z-10 box-border flex flex-1 flex-col justify-center pt-4 md:max-h-96">
        <div className="relative flex flex-1 flex-col items-center justify-center rounded-2xl border border-gray-300">
          <div className="text-md relative z-0 mx-auto my-0 flex h-24 w-24 flex-col justify-center rounded-full border border-dashed border-gray-300 text-center text-gray-400 md:h-52 md:w-52">
            <ImVolumeIncrease className="mx-auto my-0 h-1/4 w-1/4 text-lg" />
          </div>
          <div className="absolute bottom-3 left-0 right-0 z-10 mx-auto flex flex-row justify-center">
            <Button size="default">
              {t("home:audio_tab.record.start_record")}
            </Button>
          </div>
          <div className="absolute left-3 top-2 z-10 flex flex-row">
            <div className="flex flex-col justify-center">
              <FaRegDotCircle className="mr-3 block h-4 w-4" />
            </div>
            <div>00:00/00:30</div>
          </div>
        </div>
      </div>
      <div className="mt-2 flex flex-col">
        <MP3Player audioSrc={""} />
      </div>
      <div className="mt-2 flex flex-row justify-end">
        <Button variant="secondary">
          {t("home:audio_tab.record.download")}
        </Button>
      </div>
    </>
  );
};
export default AudioRecordTab;
