import React, {
  createContext,
  useState,
  useRef,
  useContext,
  useEffect
} from "react";

type LoadingContextType = {
  startLoading: () => void;
  stopLoading: (onDone?: () => void) => void;
  loading: boolean;
  progress: number;
};

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const modeRef = useRef<"progressing" | "finishing" | null>(null);
  const finishStartRef = useRef<number | null>(null);
  const startValueRef = useRef<number>(0);
  const onDoneRef = useRef<(() => void) | undefined>(undefined);

  const animate = (timestamp: number) => {
    if (modeRef.current === "progressing") {
      setProgress((prev) => {
        const next = prev + 0.5;
        if (next >= 95) return 95;
        return next;
      });
      animationRef.current = requestAnimationFrame(animate);
    }

    if (modeRef.current === "finishing") {
      if (finishStartRef.current === null) finishStartRef.current = timestamp;
      const elapsed = timestamp - finishStartRef.current;
      const duration = 500;

      const start = startValueRef.current;
      const progressValue = Math.min(
        start + (100 - start) * (elapsed / duration),
        100
      );

      setProgress(progressValue);

      if (elapsed < duration) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        setTimeout(() => {
          setProgress(0);
          setLoading(false);
          modeRef.current = null;
          if (onDoneRef.current) {
            onDoneRef.current();
            onDoneRef.current = undefined;
          }
        }, 300);
      }
    }
  };

  const startLoading = () => {
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    setProgress(0);
    setLoading(true);
    modeRef.current = "progressing";
    animationRef.current = requestAnimationFrame(animate);
  };

  const stopLoading = (onDone?: () => void) => {
    if (modeRef.current !== "progressing") return;
    modeRef.current = "finishing";
    startValueRef.current = progress;
    finishStartRef.current = null;
    onDoneRef.current = onDone;
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <LoadingContext.Provider
      value={{ startLoading, stopLoading, loading, progress }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used inside LoadingProvider");
  }
  return context;
};
