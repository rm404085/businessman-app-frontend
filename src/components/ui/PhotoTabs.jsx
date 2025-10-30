import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import PhotoReview from "../ReviewComponent/photoReview/PhotoReview";
import { useRef } from "react";
import PhotoDetailsTab from "../detailsTabs/photodetailstab/PhotoDetailsTab";
import PhotoSimilarProducts from "../similarProduct/photoSimilarProduct/PhotoSimilarProducts";

export default function PhotoTabs() {

  const reviewFormRef = useRef(null)

  const handleReviewTabClick = () => {

    setTimeout(()=>{
      reviewFormRef.current?.scrollIntoView({behavior: "smooth", block: "start" })
    }, 200)

  }

  return (
    <Tabs defaultValue="tab-1" className="items-center">
      <TabsList className="h-auto rounded-none border-b bg-transparent p-0">
        <TabsTrigger
        onClick={handleReviewTabClick}
          value="tab-1"
          className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary">
          Review
        </TabsTrigger>
        <TabsTrigger
          value="tab-2"
          className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary">
          Details
        </TabsTrigger>
        <TabsTrigger
          value="tab-3"
          className="relative rounded-none py-2 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary">
          Similar Product
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1">
       <div>
        <PhotoReview
        reviewFormRef={reviewFormRef}
        ></PhotoReview>
       </div>
      </TabsContent>
      <TabsContent value="tab-2">
        <div>
          <PhotoDetailsTab></PhotoDetailsTab>
        </div>
      </TabsContent>
      <TabsContent value="tab-3">
       <div>
        <PhotoSimilarProducts></PhotoSimilarProducts>
       </div>
      </TabsContent>
    </Tabs>
  );
}
