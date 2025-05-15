import { Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

type ImageUploadProps = {
  onFilesSelected: (files: File[]) => void;
};

export const ImageUpload = ({ onFilesSelected }: ImageUploadProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      onFilesSelected(files);
    }
  };

  return (
    <Box>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="upload-images"
        type="file"
        multiple
        onChange={handleFileChange}
      />
      <label htmlFor="upload-images">
        <Button variant="outlined" component="span" startIcon={<AddIcon />}>
          Upload Images
        </Button>
      </label>
    </Box>
  );
};
