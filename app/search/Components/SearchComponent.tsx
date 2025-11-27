import React, {
  CSSProperties,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { Globe, Cpu, Paperclip, Mic, ArrowRight, Music } from "lucide-react";

type SearchComponentProps = {
  onSubmit?: (value: string) => void;
  placeholder?: string;
  initialValue?: string;
  className?: string;
  disabled?: boolean;
};

const cn = (...args: Array<string | false | null | undefined>) =>
  args.filter(Boolean).join(" ");

const inputBg = "bg-[#121212]";

const SearchComponent: React.FC<SearchComponentProps> = ({
  onSubmit,
  placeholder = "Ask anything. Type @ for mentions.",
  initialValue = "",
  className,
  disabled = false,
}) => {
  const [text, setText] = useState<string>(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resizeTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px"; // reset to measure scrollHeight
    const newHeight = Math.min(el.scrollHeight, 220); // clamp max
    el.style.height = `${Math.max(newHeight, 64)}px`;
  }, []);

  useEffect(() => {
    // run on mount and whenever resizeTextarea changes
    resizeTextarea();
    if (typeof window === "undefined") return;
    const onResize = () => resizeTextarea();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [resizeTextarea]);

  useEffect(() => {
    // keep height in sync with content
    resizeTextarea();
  }, [text, resizeTextarea]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => setText(e.target.value),
    []
  );

  const submit = useCallback(() => {
    if (disabled) return;
    const trimmed = text.trim();
    if (!trimmed) return;
    onSubmit?.(trimmed);
    setText("");
    if (textareaRef.current) textareaRef.current.style.height = "64px";
  }, [text, onSubmit, disabled]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (
    e
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const isFilled = text.trim().length > 0 && !disabled;

  return (
    <div className={cn("w-full px-3 sm:px-6", className)}>
      <div
        className={cn(
          "mx-auto max-w-[900px] rounded-4xl ",
          inputBg,
          "shadow-sm"
        )}
      >
        <div
          className={cn(
            "w-full rounded-4xl overflow-hidden border border-gray-300 ",
            "bg-white"
          )}
        >
          <div className="p-3 sm:p-4">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              aria-label="Search input"
              rows={1}
              className={cn(
                "w-full bg-transparent text-lg md:text-xl placeholder:text-zinc-400 p-3 pr-4",
                "min-h-[64px] max-h-[220px] resize-none focus:outline-none",
                "text-[#101828]",
                disabled ? "opacity-60 cursor-not-allowed" : ""
              )}
              style={{ height: "auto", minHeight: 64 } as CSSProperties}
              disabled={disabled}
            />

            <div className="mt-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-zinc-400">
                {/* reserved for tokens / filters */}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="p-2 text-zinc-400 hover:text-zinc-100 rounded-full hover:bg-zinc-800 transition"
                    aria-label="Use web"
                    disabled={disabled}
                    title="Use web"
                  >
                    <Globe size={18} />
                  </button>

                  <button
                    type="button"
                    className="p-2 text-zinc-400 hover:text-zinc-100 rounded-full hover:bg-zinc-800 transition"
                    aria-label="Use compute"
                    disabled={disabled}
                    title="Use compute"
                  >
                    <Cpu size={18} />
                  </button>

                  <button
                    type="button"
                    className="p-2 text-zinc-400 hover:text-zinc-100 rounded-full hover:bg-zinc-800 transition"
                    aria-label="Attach file"
                    disabled={disabled}
                    title="Attach file"
                  >
                    <Paperclip size={18} />
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="p-2.5 bg-[#0F1916] text-white rounded-full hover:bg-[#0F1916]/90 transition-colors border border-zinc-800"
                    aria-label="Start voice input"
                    title="Voice input"
                    disabled={disabled}
                  >
                    <Mic size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={submit}
                    disabled={!isFilled}
                    aria-disabled={!isFilled}
                    aria-label={isFilled ? "Send query" : "No text to send"}
                    title={isFilled ? "Send" : "Type something to send"}
                    className={cn(
                      "p-2.5 rounded-full transition-all duration-200 border flex items-center justify-center",
                      isFilled
                        ? "bg-[#22b8cf] text-white border-transparent hover:bg-[#1faac0]"
                        : "bg-[#111827] text-zinc-400 border-zinc-800 cursor-not-allowed"
                    )}
                  >
                    {isFilled ? (
                      <ArrowRight size={18} strokeWidth={2.5} />
                    ) : (
                      <Music size={18} strokeWidth={2.5} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
