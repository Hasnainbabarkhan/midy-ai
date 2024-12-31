import { produce } from "immer";
import { create } from "zustand";
import { TabsValue as AudioTabsValue } from "@/components/main/audio-selection-pannel/tabs-content";
import { TabsValue as ImageTabsValue } from "@/components/main/photo-selection-pannel/tabs-content";
import { Step } from "@/hooks/use-stepper";
import { HistoryItemType as AudioGenerateHistoryItem } from "@/lib/audio-generate-history-db";
import { HistoryItemType as ImageGenerateHistoryItem } from "@/lib/photo-generate-history-db";
import { storeMiddleware } from "./middleware/default";

interface AudioUploadData {
  url: string | null;
}
interface ImageUploadData {
  url: string | null;
  ratio: "";
}

interface MainDataType {
  audioUrl: string | null;
  imageUrl: string | null;
  videoUrl: string | null;

  nowMainTab: Step;
  nowAudioTab: AudioTabsValue;
  nowImageTab: ImageTabsValue;

  audioGenerateData: AudioGenerateHistoryItem;
  audioUploadData: AudioUploadData;

  imageGenerateData: ImageGenerateHistoryItem;
  imageUploadData: ImageUploadData;
}

interface MainDataActions {
  setAudioUrl: (newUrl: string | null) => void;
  setImageUrl: (newUrl: string | null) => void;
  setVideoUrl: (newUrl: string | null) => void;

  setNowMainTab: (newValue: Step) => void;
  setNowAudioTab: (newValue: AudioTabsValue) => void;
  setNowImageTab: (newValue: ImageTabsValue) => void;

  setAudioGenerateData: (newData: AudioGenerateHistoryItem) => void;
  setAudioUploadData: (newData: AudioUploadData) => void;

  setImageGenerateData: (newData: ImageGenerateHistoryItem) => void;
  setImageUploadData: (newData: ImageUploadData) => void;

  setHasHydrated: (value: boolean) => void;

  reset: () => void;
}

type UseLipsyncInfoStoreType = MainDataType & MainDataActions;

export type { MainDataType, MainDataActions };

export const initialState: Omit<MainDataType, "_hasHydrated"> = {
  audioUrl: null,
  imageUrl: null,
  videoUrl: null,
  nowMainTab: "audio-selection",
  nowAudioTab: "generate",
  nowImageTab: "upload",
  audioGenerateData: {
    id: "",
    audioUrl: "",
    inputText: "",
    provider: "",
    lang: "",
    speaker: "",
    createdAt: 0,
    updatedAt: 0,
  },
  audioUploadData: {
    url: null,
  },
  imageGenerateData: {
    id: "",
    url: "",
    inputText: "",
    createdAt: 0,
    updatedAt: 0,
    ratio: "",
  },
  imageUploadData: {
    url: null,
    ratio: "",
  },
};

export const useLipsyncInfoStore = create<UseLipsyncInfoStoreType>()(
  storeMiddleware<MainDataType & MainDataActions>(
    (set) => ({
      ...initialState,
      _hasHydrated: false,
      reset: () => {
        set(initialState);
      },
      setHasHydrated: (value) =>
        set(
          produce((state) => {
            state._hasHydrated = value;
          })
        ),
      setNowMainTab: (value) =>
        set(
          produce<MainDataType>((state) => {
            state.nowMainTab = value;
          })
        ),
      setAudioUrl: (value) =>
        set(
          produce<MainDataType>((state) => {
            state.audioUrl = value;
          })
        ),
      setImageUrl: (value) =>
        set(
          produce<MainDataType>((state) => {
            state.imageUrl = value;
          })
        ),
      setNowAudioTab: (value) =>
        set(
          produce<MainDataType>((state) => {
            state.nowAudioTab = value;
          })
        ),
      setNowImageTab: (value) =>
        set(
          produce<MainDataType>((state) => {
            state.nowImageTab = value;
          })
        ),

      setAudioGenerateData: (value) =>
        set(
          produce<MainDataType>((state) => {
            state.audioGenerateData = value;
          })
        ),
      setAudioUploadData: (value) => {
        set(
          produce<MainDataType>((state) => {
            state.audioUploadData = value;
          })
        );
      },
      setImageGenerateData: (value) =>
        set(
          produce<MainDataType>((state) => {
            state.imageGenerateData = value;
          })
        ),
      setImageUploadData: (value) =>
        set(
          produce<MainDataType>((state) => {
            state.imageUploadData = value;
          })
        ),
      setVideoUrl: (value) =>
        set(
          produce<MainDataType>((state) => {
            state.videoUrl = value;
          })
        ),
    }),
    "lipsync_info_store"
  )
);
