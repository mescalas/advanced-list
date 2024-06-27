import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence, LayoutGroup, Reorder } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Repeat, XIcon } from "lucide-react";
import { Checkbox } from "./components/ui/checkbox";
import clsx from "clsx";

const ITEMS = [
  {
    text: "Finish blog post ✍️",
    checked: false,
    id: 1,
  },
  {
    text: "Build new Three.js experiences ✨",
    checked: false,
    id: 2,
  },
  {
    text: "Add new components to Design System 🌈",
    checked: false,
    id: 3,
  },
  {
    text: "Make some coffee ☕️",
    checked: false,
    id: 4,
  },
  {
    text: "Drink water 💧",
    checked: false,
    id: 5,
  },
  {
    text: "Go to the gym 🏃‍♂️",
    checked: false,
    id: 6,
  },
];

function App() {
  const [items, setItems] = useState(ITEMS);
  const [height, setHeight] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.target.getBoundingClientRect();

        setHeight(rect.height);
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const completeItem = (id: number) => {
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        const updatedItem = {
          ...item,
          checked: !item.checked,
        };

        return updatedItem;
      }

      return item;
    });

    setItems(updatedItems);
  };

  return (
    <TooltipProvider>
      <Card className="w-[640px] mx-auto mt-[10rem]">
        <CardContent
          as={motion.div}
          animate={{ height }}
          transition={{ duration: 0.3 }}
        >
          <div
            ref={elementRef}
            className="flex flex-col gap-4 items-start px-0 py-6"
          >
            <div className="flex gap-4">
              <Button
                disabled={items.length > 5}
                onClick={() =>
                  setItems((prev) => {
                    return [
                      ...prev,
                      {
                        text: "Prepare for a space travel 🚀",
                        id: Math.random(),
                        checked: false,
                      },
                    ];
                  })
                }
              >
                Add item
              </Button>
              <Tooltip key="tooltip-reset-list">
                <TooltipTrigger>
                  <Button onClick={() => setItems(ITEMS)}>
                    <Repeat className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reset task list</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <LayoutGroup>
              <Reorder.Group
                axis="y"
                values={items}
                onReorder={setItems}
                className="flex flex-col gap-3 m-0 p-0 w-full"
              >
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{
                        opacity: 0,
                        transition: {
                          duration: 0.2,
                        },
                      }}
                      transition={{
                        delay: 0.2,
                      }}
                      className="flex items-center justify-between gap-6"
                    >
                      <Card
                        as={Reorder.Item}
                        value={item}
                        className="h-full grow list-none cursor-grab"
                        style={{
                          position: "relative",
                          borderRadius: "12px",
                          width: item.checked ? "70%" : "100%",
                        }}
                      >
                        <CardContent
                          as={motion.div}
                          layout="position"
                          className="flex items-center gap-4 p-4"
                        >
                          <Checkbox
                            id={`checkbox-${item.id}`}
                            aria-label="Mark as done"
                            checked={item.checked}
                            onClick={() => completeItem(item.id)}
                          />
                          <p className="mb-[2px]">{item.text}</p>
                        </CardContent>
                      </Card>
                      <AnimatePresence initial={false}>
                        {item.checked ? (
                          <motion.div
                            layout
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1, transition: { delay: 0.2 } }}
                            exit={{ opacity: 0 }}
                          >
                            <Button
                              variant="secondary"
                              size="icon"
                              onClick={() =>
                                setItems((prev) =>
                                  prev.filter((task) => task.id !== item.id)
                                )
                              }
                            >
                              <XIcon />
                            </Button>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </Reorder.Group>
              <motion.div layout>
                <p>Check items off the list when you&apos;re done!</p>
              </motion.div>
            </LayoutGroup>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

export default App;
