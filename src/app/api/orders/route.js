import { NextResponse } from "next/server";
import { db } from "@/lib/firebaseAdmin";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, address, phone, quantity } = body;

    if (!name || !address || !phone || !quantity) {
      return NextResponse.json(
        { error: "Name, address, phone, and quantity are required." },
        { status: 400 }
      );
    }

    const numericQuantity = Number(quantity);

    if (!Number.isFinite(numericQuantity) || numericQuantity <= 0) {
      return NextResponse.json(
        { error: "Quantity must be greater than 0." },
        { status: 400 }
      );
    }

    const order = {
      name: String(name).trim(),
      address: String(address).trim(),
      phone: String(phone).trim(),
      quantity: numericQuantity,
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection("vigolic-100").add(order);

    return NextResponse.json(
      {
        message: "Order saved successfully.",
        orderId: docRef.id,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Failed to save order." },
      { status: 500 }
    );
  }
}
