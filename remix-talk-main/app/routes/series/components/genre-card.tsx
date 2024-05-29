import comedySrc from "~/assets/comedy-min.jpeg";
import dramaSrc from "~/assets/criminal-min.jpeg";

function buildCardAttr(genre: string) {
  if (genre === "drama") {
    return { src: dramaSrc, alt: "criminal drama", text: "Drama" };
  }
  return { src: comedySrc, alt: "comedy", text: "Comedy" };
}

interface GenreCardProps {
  genre: string;
}

export default function GenreCard({ genre }: GenreCardProps) {
  const { src, alt, text } = buildCardAttr(genre.toLowerCase());
  return (
    <div className="genre-card">
      <div
        style={{ height: "280px", overflow: "hidden", borderRadius: "0.6rem" }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: "230px",
            height: "350px",
            verticalAlign: "top",
            objectFit: "cover",
            overflow: "hidden",
          }}
        />
      </div>
      <h3>{text}</h3>
    </div>
  );
}
