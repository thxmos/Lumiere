// import { Controller } from "react-hook-form";
// import { ThemeFormProps } from "./font.form";
// import { SelectInput } from "@/components/select-input";
// import { AssetType } from "@prisma/client";
// import { Label } from "@/components/ui/label";

// export function BackgroundSection({ control }: ThemeFormProps) {
//   return (
//     <>
//       <div className="space-y-2">
//         <Label className="text-lg font-bold">Background</Label>
//         <div className="flex items-center space-x-2 mt-2">
//           <Label className="w-24 font-bold">Type</Label>
//           <Controller
//             name="theme.backgroundType"
//             control={control}
//             defaultValue={BACKGROUND_TYPES[0].value}
//             render={({ field: { onChange, value } }) => (
//               <SelectInput
//                 options={BACKGROUND_TYPES}
//                 placeholder="Select background type"
//                 onValueChange={onChange}
//                 defaultValue={value}
//               />
//             )}
//           />
//         </div>

//         {/* Color Background */}
//         {backgroundType === "color" && (
//           <>
//             <div className="flex items-center space-x-2 mt-2">
//               <Label className="w-24 font-bold">Color</Label>
//               <Controller
//                 name="theme.backgroundColor"
//                 control={control}
//                 render={({ field: { onChange, value } }) => (
//                   <ColorSelect
//                     value={value || ""}
//                     themePrimaryColor={watch("theme.backgroundColor") ?? WHITE}
//                     onChange={onChange}
//                   />
//                 )}
//               />
//             </div>
//             <div className="flex items-center space-x-2 mt-2">
//               <Controller
//                 name="theme.gradient"
//                 control={control}
//                 render={({ field: { onChange, value } }) => (
//                   <>
//                     <Label className="w-24 font-bold">Gradient</Label>
//                     <Switch
//                       id="gradient"
//                       checked={value}
//                       onCheckedChange={onChange}
//                     />
//                   </>
//                 )}
//               />
//             </div>
//             {watch("theme.gradient") && (
//               <div className="flex items-center space-x-2 mt-2">
//                 <Label className="w-24 font-bold">Gradient Color</Label>
//                 <Controller
//                   name="theme.gradientColor"
//                   control={control}
//                   render={({ field: { onChange, value } }) => (
//                     <ColorSelect
//                       value={value || ""}
//                       themePrimaryColor={watch("theme.gradientColor") ?? WHITE}
//                       onChange={onChange}
//                     />
//                   )}
//                 />
//               </div>
//             )}
//           </>
//         )}

//         {/* Image Background */}
//         {backgroundType === "image" && (
//           <div className="flex items-center space-x-2 mt-2">
//             <Label className="w-24 font-bold">Image URL</Label>
//             <Controller
//               name="theme.backgroundImageUrl"
//               control={control}
//               render={({ field: { onChange, value } }) => (
//                 // <Input
//                 //   type="text"
//                 //   value={value || ""}
//                 //   onChange={onChange}
//                 // />
//                 <SelectInput
//                   options={assets
//                     .filter((asset) => asset.type === AssetType.IMAGE)
//                     .map((asset) => ({
//                       label: asset.title ?? "Untitled",
//                       value: asset.url,
//                     }))}
//                   placeholder="Select image asset"
//                   onValueChange={onChange}
//                   defaultValue={value ?? undefined}
//                 />
//               )}
//             />
//           </div>
//         )}

//         {/* Video Background */}
//         {backgroundType === "video" && (
//           <div className="flex items-center space-x-2 mt-2">
//             <Label className="w-24 font-bold">Video Asset</Label>
//             <Controller
//               name="theme.videoUrl"
//               control={control}
//               render={({ field: { onChange, value } }) => (
//                 // <Input
//                 //   type="text"
//                 //   value={value || ""}
//                 //   onChange={onChange}
//                 // />
//                 <SelectInput
//                   options={assets
//                     .filter((asset) => asset.type === AssetType.VIDEO)
//                     .map((asset) => ({
//                       label: asset.title ?? "Untitled",
//                       value: asset.url,
//                     }))}
//                   placeholder="Select video asset"
//                   onValueChange={onChange}
//                   defaultValue={value ?? undefined}
//                 />
//               )}
//             />
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
