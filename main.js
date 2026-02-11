/* 
Program: IRL SideQuest Generator
Purpose: Transform everyday actions into RPG-style missions
Language: JavaScript
Author: Reece Hannah
*/

import React, { useState, useEffect} from "react";
import { motion, AnimatePresence} from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Trophy, Flame, Skull } from "lucide-react";

const objectives = [
    "Compliment a stranger genuinely",
    "Have a 5-minute deep conversation",
    "Try a food you've never eaten",
    "Learn 5 words in a new language",
    "Take a completely new route",
    "Write a 150-word story",
    "Do 30 push-ups",
    "Meditate for 15 minutes",
    "Clean one chaotic area",
    "Help someone unexpectedly"
];

const locations = [
    "at a coffee shop",
    "at work or school",
    "at the gym",
    "in a park",
    "in a grocery store",
    "online",
    "at home",
    "on your commute",
    "in your neighborhood",
    "somewhere completely new"
];

const twists = [
    "without using your phone",
    "while maintaining eye contact",
    "within 30 minutes",
    "without explaining why",
    "while dressed unusually well",
    "and journal about it",
    "and reflect emotionally",
    "but you only get one attempt",
    "and teach someone after",
    "and document it visually"
];

const rewards = [
    { xp: 5, label: "+5 Confidence" },
    { xp: 10, label: "+10 Social XP" },
    { xp: 5, label: "+5 Discipline" },
    { xp: 15, label: "Perspective Unlocked" },
    { xp: 10, label: "+10 Charisma" },
    { xp: 8, label: "+8 Courage" },
    { xp: 12, label: "+12 Creativity" }
];

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export default function RealLifeSideQuest() {
    const [quest, setQuest] = useState(null);
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [streak, steStreak] = useState(0);
    const [difficulty, setDifficulty] = useState("Normal");

    useEffect(() => {
        const newLevel = Math.floor(xp / 50) + 1;
        setLevel(newLevel);
    }, [xp]);

    const generateQuest = () => {
        const reward = getRandom(rewards);
        const multiplier = difficulty === "Hard" ? 2 : difficulty === "Extreme" ? 3 : 1;

        setQuest({
            objective: getRandom(objectives),
            location: getRandom(locations),
            twist: getRandom(twists),
            reward: {
                xp: reward.xp * multiplier,
                label: reward.label
            }
        })
    };

    const completeQuest = () => {
        if (!quest) return;
        setXp(prev => prev + quest.reward.xp);
        setStreak(prev => prev + 1);
        setQuest(null); 
    };

    const difficultyColor =
        difficulty === "Normal"
        ? "bg-blue-500"
        : difficulty === "Hard"
        ? "bg-orange-500"
        : "bg-red-600";

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-6 flex flex-col items-center">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-4 flex items-center gap-2"
            >
                <Sparkles className="text-purple-400" /> Real-Life Side Quest
            </motion.h1>


            <Card className="w-full max-w-xl bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl p-4">
                <CardContent className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-400">Level {level}</p>
                        <Progress value={(xp % 50) * 2} />
                        <p className="text-xs text-gray-500 mt-1">XP: {xp}</p>
                    </div>


                    <div className="flex justify-between items-center">
                        <p className="flex items-center gap-2">
                            <Flame className="text-orange-400" /> Streak: {streak}
                        </p>
                        <div className="flex gap-2">
                            {["Normal", "Hard", "Extreme"].map(mode => (
                                <Button
                                    key={mode}
                                    onClick={() => setDifficulty(mode)}
                                    className={`${difficulty === mode ? difficultyColor : "bg-gray-700"} rounded-xl`}
                                >
                                    {mode}
                                </Button>
                            ))}
                        </div>
                    </div>


                    <Button
                        onClick={generateQuest}
                        className="w-full rounded-2xl text-lg bg-purple-600 hover:bg-purple-700"
                    >
                        Generate Quest
                    </Button>

                    <AnimatePresence mode="wait">
                        {quest && (
                            <motion.div
                                key={quest.objective}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                className="bg-gray-900 p-4 rounded-2xl shadow-xl"
                            >
                                <p className="text-lg font-semibold">🎯 {quest.objective} {quest.location}</p>
                                <p className="text-sm text-gray-400 mt-2">Bonus: Complete it {quest.twist}</p>
                                <p className="text-green-400 mt-3 flex items-center gap-2">
                                    <Trophy size={16} /> Reward: {quest.reward.label} (+{quest.reward.xp} XP)
                                </p>
                                <Button
                                    onClick={completeQuest}
                                    className="w-full mt-4 bg-green-600 hover:bg-green-700 rounded-2xl"
                                >
                                    Complete Quest
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>


            {difficulty === "Extreme" && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6 text-red-500 flex items-center gap-2"
                >
                    <Skull /> Extreme Mode Active — Higher Risk. Higher Growth.
                </motion.div>
            )}
        </div>
    );
}
