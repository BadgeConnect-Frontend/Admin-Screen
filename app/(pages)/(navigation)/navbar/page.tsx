"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/router";

function Default() {
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  });
}

export default Default;
