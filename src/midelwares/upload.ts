// import multer, { StorageEngine } from "multer";
// import path from "path";
// import { Request, Response } from "express";
// import { HttpError } from "../../helpers";

// const destination = path.resolve("temp");

// const storage: StorageEngine = multer.diskStorage({
//     destination,
//     filename: (req: Request, file: Express.Multer.File, cb: (error: any, filename: string) => void) => {
//       const uniquePrefix = `${Date.now()}${Math.round(Math.random() * 1e9)}`;
//       const filename = `${uniquePrefix}${path.extname(file.originalname)}`;
//       cb(null, filename); // Ensure that filename is always a string
//     },
//   });

// const limits = {
//   fileSize: 5 * 1024 * 1024, 
// };

// const fileFilter = (req: Request, file: Express.Multer.File, cb: (error: any, acceptFile: boolean) => void) => {
//   const extension = file.originalname.split(".").pop();
//   if (extension === "exe") {
//     return cb(new HttpError(400, "Invalid file extension"), false);
//   }
//   cb(null, true);
// };

// const upload = multer({
//   storage,
//   limits,
//   fileFilter,
// });

// export default upload;




