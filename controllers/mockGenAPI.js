function MockGenAPIEndpoint(synopsis) {
    return new Promise((resolve) => {
        const delay = 1000;
        const lower = synopsis.toLowerCase();
        let score = 0;

        // Clarity & Structure
        if (
            /guide|steps|process|learn|explain|how to|outline|walkthrough|break down|instructional/.test(lower)
        ) {
            score += 2;
        } else {
            score += 1;
        }

        // Emotional Hook / Stakes
        if (
            /risk|loss|betrayal|love|revenge|hope|death|grief|sacrifice|fear|regret|despair|longing|crisis|redemption/.test(
                lower
            )
        ) {
            score += 2;
        } else {
            score += 0.5;
        }

        // Character & Conflict
        if (
            /character|hero|villain|protagonist|journey|conflict|struggle|enemy|mission|motivation|goal|challenge|choice|antagonist|past/.test(
                lower
            )
        ) {
            score += 2;
        } else {
            score += 0.5;
        }

        // Originality / Uniqueness
        if (
            /unique|twist|unexpected|fresh|original|reimagine|innovative|genre-bending|unconventional|surprising/.test(
                lower
            )
        ) {
            score += 2;
        } else {
            score += 1;
        }

        // Tone & Voice
        if (
            /you|let’s|get started|guide|confident|clear|engaging|inviting|accessible|helpful|supportive|reassuring/.test(
                lower
            )
        ) {
            score += 2;
        } else {
            score += 1;
        }



        const finalScore = Math.round(Math.min(10, Math.max(1, score)));
        if (score >= 9) {
            feedback = "Really strong! It’s clear, engaging, and emotionally resonant.";
        } else if (score >= 7) {
            feedback = "Nice job — it’s solid overall, but could use a bit more depth or originality.";
        } else if (score >= 5) {
            feedback = "Not bad, but it's missing some key pieces like tension or character motivation.";
        } else {
            feedback = "Needs more clarity and emotional pull to really connect.";
        }



        setTimeout(() => {
            resolve({ score: finalScore, feedback });
        }, delay);
    });
}

module.exports = MockGenAPIEndpoint;
