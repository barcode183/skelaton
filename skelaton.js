function pHurtFunc() {
    hitgroup = Event.GetInt("hitgroup");
    victimEntity = Entity.GetEntityFromUserID(Event.GetInt("userid"));
    if (victimEntity != Entity.GetLocalPlayer() && !UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Include enemies:")) {
        return;
    }
    hitboxPositions = [];
    for (var i = 0; i < 19; i++) {
        hitboxPositions.push(Entity.GetHitboxPosition(victimEntity, i));
    }
    hPosArr.push( [hitboxPositions, 255] );
}
hPosArr = [];
function drawFunc() {
    for (var i = 0; i < hPosArr.length; i++) {
        hitPositions = hPosArr[i][0];
        
        headPos = Render.WorldToScreen(hitPositions[0]);
        neckPos = Render.WorldToScreen(hitPositions[1]);
        
        pelvisPos = Render.WorldToScreen(hitPositions[2]);
        bodyPos = Render.WorldToScreen(hitPositions[3]);
        lungPos = Render.WorldToScreen(hitPositions[4]);
        chestPos = Render.WorldToScreen(hitPositions[5]);
        uChestPos = Render.WorldToScreen(hitPositions[6]);
        lThighPos = Render.WorldToScreen(hitPositions[7]);
        rThighPos = Render.WorldToScreen(hitPositions[8]);
        lCalfPos = Render.WorldToScreen(hitPositions[9]);
        rCalfPos = Render.WorldToScreen(hitPositions[10]);
        lFootPos = Render.WorldToScreen(hitPositions[11]);
        rFootPos = Render.WorldToScreen(hitPositions[12]);
        lHandPos = Render.WorldToScreen(hitPositions[13]);
        rHandPos = Render.WorldToScreen(hitPositions[14]);
        lUpperArmPos = Render.WorldToScreen(hitPositions[15]);
        lForearmPos = Render.WorldToScreen(hitPositions[16]);
        rUpperArmPos = Render.WorldToScreen(hitPositions[17]);
        rForearmPos = Render.WorldToScreen(hitPositions[18]);
        
        
        skeletonColor = [255, 255, 255, 255];
        if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Rainbow skeleton:")) {
            rainbowCol = HSVtoRGB(Global.Realtime() / 2, 1, 1);
            skeletonColor = [rainbowCol.r, rainbowCol.g, rainbowCol.b, hPosArr[i][1]];
        }
        
        if (UI.GetValue("Misc", "JAVASCRIPT", "Script items", "Fade skeleton out:")) {
            hPosArr[i][1]--;
            if (hPosArr[i][1] < 0) {
                hPosArr.shift(i, 1);
            }
        }
        //Head -> Neck
        Render.Line(headPos[0], headPos[1], neckPos[0], neckPos[1], skeletonColor);
        
        //Neck -> Upper chest
        Render.Line(neckPos[0], neckPos[1], uChestPos[0], uChestPos[1], skeletonColor);
        
        //Upper chest -> Pelvis
        Render.Line(uChestPos[0], uChestPos[1], pelvisPos[0], pelvisPos[1], skeletonColor);
        
        //Upper chest -> leftArmStart
        Render.Line(uChestPos[0], uChestPos[1], lUpperArmPos[0], lUpperArmPos[1], skeletonColor);
        
        //Upper chest -> rightArmStart
        Render.Line(uChestPos[0], uChestPos[1], rUpperArmPos[0], rUpperArmPos[1], skeletonColor);
        
        if (UI.GetValue("Misc", "JAVASCRIPT" ,"Script items", "Draw key circles:")) {
        //Head circle
        Render.Circle(headPos[0], headPos[1], 5, skeletonColor);
        //Left calf
        Render.Circle(lCalfPos[0], lCalfPos[1], 5, skeletonColor);  
        //Right calf
        Render.Circle(rCalfPos[0], rCalfPos[1], 5, skeletonColor);
        //Right hand
        Render.Circle(rHandPos[0], rHandPos[1], 5, skeletonColor);      
        //Left hand
        Render.Circle(lHandPos[0], lHandPos[1], 5, skeletonColor);
        }
        //upper arm pos -> hands
        Render.Line(rUpperArmPos[0], rUpperArmPos[1], rHandPos[0], rHandPos[1], skeletonColor );
        Render.Line(lUpperArmPos[0], lUpperArmPos[1], lHandPos[0], lHandPos[1], skeletonColor );

        //Upper chest -> chest
        Render.Line(uChestPos[0], uChestPos[1], chestPos[0], chestPos[1], skeletonColor);
        
        //chest -> thighs
        Render.Line(chestPos[0], chestPos[1], lThighPos[0], lThighPos[1], skeletonColor);
        Render.Line(chestPos[0], chestPos[1], rThighPos[0], rThighPos[1], skeletonColor);
        
        //thighs -> calfs
        Render.Line(lThighPos[0], lThighPos[1], lCalfPos[0], lCalfPos[1], skeletonColor);
        Render.Line(rThighPos[0], rThighPos[1], rCalfPos[0], rCalfPos[1], skeletonColor);
        
        //calfs -> feet (yummy)
        Render.Line(lCalfPos[0], lCalfPos[1], lCalfPos[0], lCalfPos[1], skeletonColor);
        Render.Line(rCalfPos[0], rCalfPos[1], rCalfPos[0], rCalfPos[1], skeletonColor);
    }
}
function wipeFunc() {
    hPosArr = [];
}
function main() {
    UI.AddCheckbox("Rainbow skeleton:");
    UI.AddCheckbox("Include enemies:");
    UI.AddCheckbox("Draw key circles:");
    UI.AddCheckbox("Fade skeleton out:");
    
    Cheat.RegisterCallback("player_hurt", "pHurtFunc");
    Cheat.RegisterCallback("Draw", "drawFunc");
    Cheat.RegisterCallback("round_start", "wipeFunc");
}
main();
function getConnectedBox(hitbox) {
    codedOpts = [7,8,9,10];
    if (codedOpts.indexOf(hitbox) == -1) {
        return hitbox + 1;
    }
    
    newHbox = hitbox;
    switch (hitbox) {
        case 7:
        newHbox = 5;
        break;
        case 8:
        newHbox = 5;
        break;
        case 9:
        newHbox = 7;
        break;
        case 10:
        newHbox = 8;
        break;
    }
    
    return newHbox;
}


function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}
