import { Typography } from "@mui/material";

interface LongTextProps {
  text: string;
  maxWidth?: string;
  fontSize?:string;
  description?:string;
}

const LongTextComponent: React.FC<LongTextProps> = ({description,fontSize, text, maxWidth = "200px" }) => {
  return (
    <Typography
      variant="body1"
      style={{
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        maxWidth: maxWidth,
        fontSize:fontSize
      }}
    >
      {description}{text}
    </Typography>
  );
};

export default LongTextComponent;
