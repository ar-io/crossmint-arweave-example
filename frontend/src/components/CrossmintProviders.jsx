import { CrossmintProvider, CrossmintAuthProvider } from "@crossmint/client-sdk-react-ui";

export default function CrossmintProviders({ children }) {
  const apiKey = import.meta.env.VITE_CROSSMINT_API_KEY || "";
  
  // Debug to verify the API key is being loaded
  console.log("Provider API Key:", apiKey ? "Exists" : "Missing");

  return (
    <CrossmintProvider apiKey={apiKey}>
      <CrossmintAuthProvider
        loginMethods={["email", "google", "farcaster"]} // You can customize these methods
      >
        {children}
      </CrossmintAuthProvider>
    </CrossmintProvider>
  );
}
