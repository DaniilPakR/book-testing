"use server"

import { generateFakeBooks } from "../utils/utils"

export default async function Books() {

  const books = generateFakeBooks

  return (
    <div></div>
  )
}