import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { clearModal, closeModal } from "../features/modal/modalSlice";
import { ModalType } from "../features/modal/modalSlice";
import ProductEditModal from "./ProductEditModal";
import { COLORS } from "../utils/colors";
import { scheduleOnRN } from "react-native-worklets";

const OVERLAY_DURATION = 180;
const MODAL_DURATION = 220;

export default function GlobalModal() {
  const dispatch = useAppDispatch();
  const { visible, modalType, modalProps } = useAppSelector(
    (state) => state.modal
  );
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const overlayVal = useSharedValue(0); // 0..1
  const translateY = useSharedValue(40); // px

  useEffect(() => {
    if (visible) {
      // mount content then animate in
      setIsMounted(true);
      overlayVal.value = withTiming(1, { duration: OVERLAY_DURATION });
      translateY.value = withTiming(0, { duration: MODAL_DURATION });
    } else if (isMounted) {
      // animate out, then clear & unmount
      overlayVal.value = withTiming(0, { duration: OVERLAY_DURATION });
      translateY.value = withTiming(
        40,
        { duration: MODAL_DURATION },
        (finished) => {
          if (finished) {
            scheduleOnRN(onHidden);
          }
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  function onHidden() {
    setIsMounted(false);
    dispatch(clearModal()); // clear modalType & props after hide animation
  }

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayVal.value,
  }));

  const modalStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: overlayVal.value, // subtle fade
  }));

  const handleBackgroundPress = () => {
    // optional: close modal when tapping outside
    dispatch(closeModal());
  };

  if (!isMounted) return null;

  const renderContent = () => {
    switch (modalType as ModalType) {
      case "EDIT_PRODUCT":
        return <ProductEditModal {...(modalProps ?? {})} />; // modalProps should include { id, title }
      default:
        return null;
    }
  };

  return (
    <View style={styles.container} pointerEvents="box-none">
      <TouchableWithoutFeedback onPress={handleBackgroundPress}>
        <Animated.View style={[styles.overlay, overlayStyle]} />
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.modalWrap}
      >
        <Animated.View style={[styles.modal, modalStyle]}>
          {renderContent()}
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  modalWrap: {
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "100%",
    maxWidth: 560,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    padding: 16,
    // shadow
    shadowColor: COLORS.text,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
});
