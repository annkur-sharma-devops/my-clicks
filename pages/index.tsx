import fs from 'fs';
import path from 'path';
import styles from '../styles/Home.module.css';
import UploadForm from '../components/UploadForm';

type Props = {
  photos: string[];
};

export default function Home({ photos }: Props) {
  const handleUploadComplete = () => {
    window.location.reload(); // Auto-refresh after upload
  };

  return (
    <main className={styles.gallery}>
      <h1>📸 My Clicks</h1>

      <UploadForm onUploadComplete={handleUploadComplete} />

      <div className={styles.grid}>
        {photos.map((name, i) => (
          <div key={i} className={styles.thumb}>
            <img src={`/uploads/${name}`} alt={`Photo ${i}`} width="200" />
            {/* Removed <p>{new Date().toLocaleDateString()}</p> to avoid hydration mismatch */}
          </div>
        ))}
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  const dir = path.join(process.cwd(), 'public/uploads');
  const photos = fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((file) => /\.(jpe?g|png|gif|webp)$/i.test(file))
    : [];

  return {
    props: { photos },
  };
}
