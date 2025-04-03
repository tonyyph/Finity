import { useUser } from "@clerk/clerk-expo";

export function useUserMetadata() {
  const { user } = useUser();

  async function setOnboardedAt(onboardedAt: string | undefined) {
    return user?.update({
      unsafeMetadata: {
        ...(user?.unsafeMetadata ?? {}),
        onboardedAt
      }
    });
  }

  return {
    onboardedAt: user?.unsafeMetadata?.onboardedAt,
    setOnboardedAt
  };
}
