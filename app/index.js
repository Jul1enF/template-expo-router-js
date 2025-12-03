import { Redirect } from "expo-router";

export default function EntryPoint() {
  return <Redirect href="/home" />;
}


// import { useRouter, useFocusEffect } from "expo-router";

// export default function Index() {
//   const router = useRouter();
//   useFocusEffect(() => {
//     router.replace("/home");
//   });
//   return null;
// }


// import { useRouter, useFocusEffect } from "expo-router";
// import { useCallback } from "react";

// export default function Index() {
//   const router = useRouter();
//   useFocusEffect(useCallback(() => {
//     router.replace("/home");
//   }));
//   return null;
// }