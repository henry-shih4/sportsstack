import React from "react";
import ReactMarkDown from "react-markdown";

export default function MarkdownTest() {
  const markdown = `Brandon Aiyuk and the San Francisco 49ers are at a crossroads.

The disgruntled wide receiver reportedly met with head coach Kyle Shanahan and general manager John Lynch this week. Aiyuk's representatives and the 49ers appear to be at an impasse as they try to negotiate a long-term contract extension.

Aiyuk, 26, is in the final year of his rookie deal that will pay him $14.1 million for the upcoming season. He wants to be paid among the top receivers in the league, who now make in the range of $30 million annually.   

However, the 49ers already have receiver Deebo Samuel under contract for two more years on a three-year, $73.5 million deal. This offseason, San Francisco signed Christian McCaffrey to a new contract that makes him the highest-paid running back in the league. The Niners also have lucrative long-term deals with Nick Bosa, Trent Williams, Javon Hargrave, Fred Warner and George Kittle. And after the 2024 season, Brock Purdy will be eligible for a new contract that will make him one of the highest-paid quarterbacks in the league.

Even with San Francisco chasing a Super Bowl, Aiyuk could be too expensive to keep beyond 2024. To protect themselves at the position, the 49ers signed No. 3 receiver Jauan Jennings to a two-year, $15.4 million deal and drafted receivers Ricky Pearsall and Jacob Cowing in April.

Lynch said in early May that the Niners were "past" entertaining trade offers for Aiyuk and Samuel. But if negotiations go sour with Aiyuk and San Francisco is willing to move on at some point this summer, here are five teams that make sense in a trade.

### Pittsburgh Steelers

The Steelers need veteran receiver help and have shown interest in a potential trade for Aiyuk. Whether it's Russell Wilson or Justin Fields who emerges as the team's new starter at quarterback, Pittsburgh could use a top-flight receiver opposite big-play guy George Pickens.

According to Over the Cap, the Steelers are spending $14 million in receiver salaries, third-lowest in the NFL. And Pittsburgh has about $16 million in cap space, so the team can afford to sign Aiyuk to the deal he wants. 

Pittsburgh averaged just 18 points per game last year and had one of the worst passing offenses in the league, averaging just 186 yards per game. With Aiyuk, the Steelers would have a chance to create balance on offense, pairing two talented receivers with an already strong running game. That would help them compete in one of the NFL's best divisions. 

### Washington Commanders

Former San Francisco front office executive Adam Peters now serves as general manager for Washington, so his experience with Lynch and the 49ers could help broker a fair trade for both sides.

Aiyuk and Commanders rookie quarterback Jayden Daniels were teammates at Arizona State and the receiver knows Washington assistant Anthony Lynn from his time with the 49ers. The Commanders could use a talented receiver opposite Terry McLaurin, and Aiyuk would have an instant rapport with Daniels.

In mid-June, Aiyuk FaceTimed Daniels and told him that the Niners don't want him back. Then this week, there were rumors that San Francisco had discussed an Aiyuk deal with Washington before the draft.

### Buffalo Bills

With Stefon Diggs traded to the Houston Texans, the Bills could use a No. 1 receiver as they attempt to compete with the Kansas City Chiefs for the top spot in the AFC. 

Buffalo drafted Florida State receiver Keon Coleman with the first pick in the second round and already had two talented tight ends in Dalton Kincaid and Dawson Knox. 

The Bills could use more two-tight-end sets in 2024, but with Aiyuk in the fold, they would have another No. 1 receiver to pair with gunslinger Josh Allen. That would give offensive coordinator Joe Brady a dynamic playmaker to push the ball downfield. 

### Los Angeles Chargers

New head coach Jim Harbaugh moved on from veteran receivers Keenan Allen and Mike Williams, both of whom were making $20 million a year. The Chargers will spend less than that overall at receiver this year, No. 28 in the NFL. 

While the Chargers want to run the football and are not built to win now, Aiyuk would give dynamic quarterback Justin Herbert a true go-to receiver who can win on the perimeter.

If the Bolts want to compete quickly in the AFC West, they need to bring in a player like Aiyuk who gives them a chance to be explosive on offense. 

### Indianapolis Colts

Second-year QB Anthony Richardson could use another target on the outside to make his job easier. Head coach Shane Steichen, the offensive playcaller for the Colts, knows how to get the most out of an explosive playmaker like Aiyuk.

And Indianapolis general manager Chris Ballard has a history of big deals with the 49ers. Four years ago, he acquired San Francisco All-Pro defensive lineman DeForrest Buckner for a first-round pick. 

as**Aiyuk** is just as talented at his position and would be worth a first-rounder if the Colts could make him happy with a new deal. Indianapolis signed Michael Pittman Jr. to a three-year, $70 million extension in March. Perhaps that contract would be more palatable for San Francisco in a trade for Aiyuk? 
 Atlanta Hawks **: Zaccharie Risacher, F, JL Bourg**
*Eric D. Williams has reported on the NFL for more than a decade, covering the* Los Angeles Rams *for Sports Illustrated, the* Los Angeles Chargers *for ESPN and the* Seattle Seahawks *for the Tacoma News Tribune. Follow him on Twitter at* @eric\_d\_williams*.*`;

  return (
    <>
      <div className="whitespace-pre-line">
        <ReactMarkDown children={markdown} />
      </div>
    </>
  );
}
