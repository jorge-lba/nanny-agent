const { MDXRemote } = require('next-mdx-remote')
const { serialize } = require('next-mdx-remote/serialize')
import { useEffect, useState } from 'react'

interface MessageContentProps {
  content: string
}

export function MessageContent({ content }: MessageContentProps) {
  const [mdxSource, setMdxSource] = useState<any>(null)

  useEffect(() => {
    const prepareMdx = async () => {
      const mdx = await serialize(content)
      setMdxSource(mdx)
    }
    prepareMdx()
  }, [content])

  if (!mdxSource) {
    return <div>{content}</div>
  }

  return <MDXRemote {...mdxSource} />
} 