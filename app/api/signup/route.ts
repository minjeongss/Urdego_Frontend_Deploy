import { API_URL_CONFIG, API_BASE_URL } from '@/config/apiEndPointConfig';
import axiosInstance from '@/lib/axios';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    const res = await axiosInstance.post(
      `${API_BASE_URL.DNS}${API_URL_CONFIG.AUTH.SIGNUP}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return NextResponse.json(res.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
