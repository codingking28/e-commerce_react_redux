import React, { useEffect, useState } from "react";
import FormComponent from "../../components/Form/form";
import { useParams } from "react-router-dom";

export default function EditRecords() {
  let param = useParams();
  console.log(param);
  return <FormComponent />;
}
