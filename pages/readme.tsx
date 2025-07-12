import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import NavBar from '../components/NavBar'

export default function ReadmePage({ content }: { content: string }) {
  return (
    <div style={{ padding: '2rem' }}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  )
}

export async function getStaticProps() {
  const file = fs.readFileSync(path.join(process.cwd(), 'readme.md'), 'utf8')
  const { content } = matter(file)
  return { props: { content } }
}
