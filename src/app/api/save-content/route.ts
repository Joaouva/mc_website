import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { PortfolioData } from '@/data/types';

export async function POST(request: Request) {
  try {
    const updatedData: PortfolioData = await request.json();

    // Basic structure validation check
    if (!updatedData.general || !updatedData.contact || !updatedData.projects) {
      return NextResponse.json(
        { error: 'Invalid payload structure: Missing required fields.' },
        { status: 400 }
      );
    }

    // Direct local-first disk writing is ONLY enabled in local development mode
    const isDevelopment = process.env.NODE_ENV === 'development';

    if (isDevelopment) {
      const filePath = path.join(process.cwd(), 'src/data/portfolio.json');
      
      // Write pretty-formatted JSON to the disk
      fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), 'utf-8');

      return NextResponse.json({
        success: true,
        message: 'Content successfully written to local disk (src/data/portfolio.json)!'
      });
    } else {
      // In read-only production environments, return status details
      return NextResponse.json({
        success: false,
        message: 'Application is running in production mode. Direct filesystem saving is read-only. Please use the config exporter in the admin panel to download and replace src/data/portfolio.json.'
      }, { status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message || error}` },
      { status: 500 }
    );
  }
}
