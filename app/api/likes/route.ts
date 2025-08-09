import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const body = await request.json();

  const selectData = await supabase
    .from("Like")
    .select()
    .eq("user_id", body.user_id)
    .eq("post_id", body.post_id);

  if (selectData.data?.length !== 0) {
    await supabase
      .from("Like")
      .delete()
      .eq("user_id", body.user_id)
      .eq("post_id", body.post_id);
  } else {
    await supabase.from("Like").insert({
      user_id: body.user_id,
      post_id: body.post_id,
    });
  }

  return NextResponse.json({}, { status: 201 });
}
