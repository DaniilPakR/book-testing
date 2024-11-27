import { NextResponse } from 'next/server';
import { generateFakeBooks } from "@/app/utils/utils";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  
  const seed = parseInt(searchParams.get('seed')) || 42;
  const reviews = parseFloat(searchParams.get('reviews')) || 0;
  const likes = parseFloat(searchParams.get('likes')) || 3.7;
  const pageIndex = parseInt(searchParams.get('pageIndex')) || 0;
  const language = searchParams.get('language') || 'EN';

  const books = await generateFakeBooks(seed, reviews, likes, pageIndex, language);

  return NextResponse.json(books);
}
