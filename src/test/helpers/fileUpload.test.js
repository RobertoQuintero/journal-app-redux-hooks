import { fileUpload } from "../../helpers/fileUpload";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: "dmq9e2wuv",
  api_key: "337274324936165",
  api_secret: "sPsPThsK6YsThB2fA3ouxUtza1I",
  secure: true,
});

describe("Pruebas en fileUpload", () => {
  test("debe de cargar un archivo y retornar el URL", async () => {
    const resp = await fetch(
      "https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/10-Free-To-Use-CORS-Proxies-1024x768.png"
    );
    const blob = await resp.blob();
    const file = new File([blob], "foto.png");

    const url = await fileUpload(file);
    expect(typeof url).toBe("string");
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".png", "");
    console.log(imageId);
    const { deleted } = await cloudinary.v2.api.delete_resources(imageId);
    expect(deleted).toEqual({ [imageId]: "deleted" });
  });
});
