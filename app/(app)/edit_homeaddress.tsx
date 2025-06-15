import { CircleAlert } from "@/components/common/icons";
import { Typography } from "@/components/common/text-typography";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/ui/header";
import { useAnimatedKeyboard } from "@/hooks";
import { cn } from "@/lib/utils";
import { userStore } from "@/stores/userStore";
import { validateUKPostcode } from "@/utils";
import { BottomIndicatorAvoidingView } from "@/utils/spacing";
import { router } from "expo-router";
import { useCallback, useState } from "react";
import { TextInput, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

const EditHomeAddressScreen = () => {
  const userProfile = userStore?.getState().userProfile;

  const [loading, setLoading] = useState<boolean>();
  const [addressLine1, setAddressLine1] = useState<string>(
    userProfile?.address?.addressLine1 ?? ""
  );
  const [addressLine2, setAddressLine2] = useState<string>(
    userProfile?.address?.addressLine2 ?? ""
  );
  const [townOrCity, setTownOrCity] = useState<string>(
    userProfile?.address?.city ?? ""
  );
  const [postCode, setPostCode] = useState<string>(
    userProfile?.address?.postCode ?? ""
  );
  const [focusAddressLine1, setFocusAddressLine1] = useState<boolean>(false);
  const [focusAddressLine2, setFocusAddressLine2] = useState<boolean>(false);
  const [focusTownOrCity, setFocusTownOrCity] = useState<boolean>(false);
  const [focusPostCode, setFocusPostCode] = useState<boolean>(false);

  const { keyboardHeight } = useAnimatedKeyboard(0);
  const translateStyle = useAnimatedStyle(() => ({
    height: keyboardHeight.value
  }));

  const handleSave = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push({
        pathname: "/pin-verification",
        params: {
          type: "edit-home-address",
          userProfile: JSON.stringify(userProfile),
          addressLine1: addressLine1,
          addressLine2: addressLine2,
          city: townOrCity,
          postCode: postCode
        }
      });
    }, 2000);
  }, [addressLine1, addressLine2, postCode, townOrCity, userProfile]);

  const isDisabled =
    !validateUKPostcode(postCode) ||
    addressLine1?.length > 50 ||
    addressLine2?.length > 50 ||
    townOrCity?.length > 20;

  return (
    <View className="flex-1 bg-background">
      <Header onBack={router.back} title="" />
      <View className="flex-1 justify-between">
        <View className="px-4 gap-4 pt-6">
          <Typography type="heading-medium" weight="semibold">
            Edit home address
          </Typography>
          <View className="justify-start gap-4">
            <View className="gap-1">
              <Typography textColor="#404040">Address line 1</Typography>
              <View className="flex-row gap-3">
                <TextInput
                  className={cn(
                    "px-3 rounded-lg bg-background flex-1 border border-border h-[48px]",
                    {
                      "border-black border-2": !!focusAddressLine1,
                      "border-errormessage border-2": addressLine1?.length > 50
                    }
                  )}
                  onFocus={() => setFocusAddressLine1(true)}
                  onEndEditing={() => setFocusAddressLine1(false)}
                  placeholder={`Enter your new mobile number.`}
                  placeholderTextColor={"#A3A3A3"}
                  autoCapitalize="none"
                  value={addressLine1}
                  onChangeText={(text) => {
                    setAddressLine1(text);
                  }}
                />
              </View>
              {addressLine1?.length > 50 && (
                <View className="flex flex-row items-center">
                  <CircleAlert className="top-1" />
                  <Typography
                    type="body-small"
                    weight="medium"
                    textColor="#D9323D"
                  >
                    {`Cannot exceed 50 characters`}
                  </Typography>
                </View>
              )}
            </View>
            <View className="gap-1">
              <Typography textColor="#404040">
                {`Address line 2 (optional)`}
              </Typography>
              <View className="flex-row gap-3">
                <TextInput
                  className={cn(
                    "px-3 rounded-lg bg-background flex-1 border border-border h-[48px]",
                    {
                      "border-black border-2": !!focusAddressLine2,
                      "border-errormessage border-2": addressLine2?.length > 50
                    }
                  )}
                  onFocus={() => setFocusAddressLine2(true)}
                  onEndEditing={() => setFocusAddressLine2(false)}
                  placeholder={`Enter your new mobile number.`}
                  placeholderTextColor={"#A3A3A3"}
                  autoCapitalize="none"
                  value={addressLine2}
                  onChangeText={(text) => {
                    setAddressLine2(text);
                  }}
                />
              </View>
              {addressLine2?.length > 50 && (
                <View className="flex flex-row items-center">
                  <CircleAlert className="top-1" />
                  <Typography
                    type="body-small"
                    weight="medium"
                    textColor="#D9323D"
                  >
                    {`Cannot exceed 50 characters`}
                  </Typography>
                </View>
              )}
            </View>
            <View className="flex-row gap-4">
              <View className="gap-1 flex-[0.65]">
                <Typography textColor="#404040">{`Town or city`}</Typography>
                <View className="flex-row gap-3">
                  <TextInput
                    className={cn(
                      "px-3 rounded-lg bg-background flex-1 border border-border h-[48px]",
                      {
                        "border-black border-2": !!focusTownOrCity
                      }
                    )}
                    onFocus={() => setFocusTownOrCity(true)}
                    onEndEditing={() => setFocusTownOrCity(false)}
                    placeholder={`Enter your new mobile number.`}
                    placeholderTextColor={"#A3A3A3"}
                    autoCapitalize="none"
                    value={townOrCity}
                    onChangeText={(text) => {
                      setTownOrCity(text);
                    }}
                  />
                </View>
                {townOrCity?.length > 20 && (
                  <View className="flex flex-row items-center">
                    <CircleAlert className="top-1" />
                    <Typography
                      type="body-small"
                      weight="medium"
                      textColor="#D9323D"
                    >
                      {`Cannot exceed 20 characters`}
                    </Typography>
                  </View>
                )}
              </View>
              <View className="gap-1 flex-[0.35]">
                <Typography textColor="#404040">{`Postcode`}</Typography>
                <View className="flex-row gap-3">
                  <TextInput
                    className={cn(
                      "px-3 rounded-lg bg-background flex-1 border border-border h-[48px]",
                      {
                        "border-black border-2": !!focusPostCode,
                        "border-errormessage border-2":
                          !validateUKPostcode(postCode)
                      }
                    )}
                    onFocus={() => setFocusPostCode(true)}
                    onEndEditing={() => setFocusPostCode(false)}
                    placeholder={`Enter your new mobile number.`}
                    placeholderTextColor={"#A3A3A3"}
                    autoCapitalize="none"
                    value={postCode}
                    onChangeText={(text) => {
                      setPostCode(text);
                    }}
                  />
                </View>
                {!validateUKPostcode(postCode) && (
                  <View className="flex flex-row items-start">
                    <CircleAlert className="top-1" />
                    <Typography
                      type="body-small"
                      weight="medium"
                      textColor="#D9323D"
                    >
                      {`Enter a valid UK postcode`}
                    </Typography>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
        <View key={1} className="justify-end">
          <View className="px-4 gap-6">
            <Button
              variant={"default"}
              size={"lg"}
              disabled={isDisabled}
              className={cn("rounded-full h-[48px]")}
              loading={loading}
              onPress={handleSave}
            >
              <Typography
                type="body-default"
                weight="medium"
                textColor={"white"}
              >
                {loading ? `Saving...` : `Save`}
              </Typography>
            </Button>
          </View>
          <BottomIndicatorAvoidingView />
        </View>
      </View>
      <Animated.View style={translateStyle} />
    </View>
  );
};

export default EditHomeAddressScreen;
