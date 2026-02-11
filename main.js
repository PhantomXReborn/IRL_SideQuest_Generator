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

    
}