function enable(name, bool) {UI.SetEnabled("Misc", "JAVASCRIPT", "Script items", name, bool)}

UI.AddDropdown("Configuration Type", ["Basic Configuration", "Advanced Configuration"])
UI.AddSliderInt("SlowWalk Yaw Offset", -180, 180)
UI.AddSliderInt("SlowWalk Jitter Offset", -180, 180)
UI.AddSliderInt("SlowWalk Real Offset", -180, 180)
UI.AddSliderInt("SlowWalk Fake Offset", -180, 180)
UI.AddSliderInt("SlowWalk LBY Offset", -180, 180)
originalYaw = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "SlowWalk Yaw Offset")
originalJitter = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "SlowWalk Jitter Offset")
function basic_math(index) {return Math.floor(Math.random() * Math.floor(index) * 1.25)}


/* CreateMove */
status = 0
function move() {
    status++;
    config_type = UI.GetString("Misc", "JAVASCRIPT", "Script items", "Configuration Type")
    yaw = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "SlowWalk Yaw Offset")
    jitter = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "SlowWalk Jitter Offset")
    real = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "SlowWalk Real Offset")
    fake = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "SlowWalk Fake Offset")
    lby = UI.GetValue("Misc", "JAVASCRIPT", "Script items", "SlowWalk LBY Offset")

    if(config_type == "Basic Configuration") {
        AntiAim.SetOverride(0);
        enable("SlowWalk Yaw Offset", true)
        enable("SlowWalk Jitter Offset", true)
        enable("SlowWalk LBY Offset", false)
        enable("SlowWalk Real Offset", false)
        enable("SlowWalk Fake Offset", false)
      
        if(status == 5) {
            if(UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) {
                UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", basic_math(yaw))
                UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", basic_math(jitter))
            }
            else {
                UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", originalYaw)
                UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", originalJitter)
            }
        status = 0;
        }
    }

    if(config_type == "Advanced Configuration") {
        AntiAim.SetOverride(1)
        enable("SlowWalk Yaw Offset", true)
        enable("SlowWalk Jitter Offset", true)
        enable("SlowWalk LBY Offset", true)
        enable("SlowWalk Real Offset", true)
        enable("SlowWalk Fake Offset", true)

        if(status == 5) {
            if(UI.IsHotkeyActive("Anti-Aim", "Extra", "Slow walk")) {
                UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", basic_math(yaw))
                UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", basic_math(jitter))
                AntiAim.SetFakeOffset(fake)
                AntiAim.SetRealOffset(real)
                AntiAim.SetLBYOffset(lby)
            }
            else {
                AntiAim.SetFakeOffset(fake)
                AntiAim.SetRealOffset(real)
                AntiAim.SetLBYOffset(lby)
                UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Yaw offset", originalYaw)
                UI.SetValue("Anti-Aim", "Rage Anti-Aim", "Jitter offset", originalJitter)
            }
        status = 0;
        }
    }
}

function unload() {
    AntiAim.SetOverride(0);
}

Cheat.RegisterCallback("CreateMove", "move")
Cheat.RegisterCallback("Unload", "unload")
