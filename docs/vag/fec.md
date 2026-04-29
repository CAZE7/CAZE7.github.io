---
hide:
  - toc
title: VAG FEC Generator | Freischaltcodes für MIB1 / MIB2 / MIB3
description: VAG FEC (Function Enabling Code) Generator für Infotainment-Systeme (MIB). Schalte Funktionen wie CarPlay, Android Auto oder Navigation frei.
keywords: VAG, FEC, Generator, MIB, Infotainment, CarPlay, Android Auto, Navigation, Freischaltcode, VCDS
---
# MIB FEC/SWaP Code Generator

Dieser Generator erstellt FEC-Codes für MIB STD2 Technisat Geräte.

Bitte gib deine VIN (Fahrgestellnummer) und VCRN ein, bevor du Codes generierst. Die generierten Codes können mit ODIS oder OBDeleven in das Steuergerät geschrieben werden. Damit das Gerät die generierten FEC/SWaP-Codes akzeptiert, muss es vorher gepatched werden!

---

<div class="md-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem;">

  <!-- Left Column: Inputs & Checkboxes -->
  <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(128,128,128,0.2); border-radius: 12px; padding: 2rem;">
    <h3 style="margin-top: 0;">Fahrzeugdaten</h3>
    
    <label for="vin" style="display: block; font-weight: bold; margin-bottom: 0.5rem;">VIN (Fahrgestellnummer): <span style="color: red;" aria-hidden="true">*</span></label>
    <input type="text" id="vin" required aria-required="true" class="md-input" placeholder="WVWZZZ..." maxlength="17" value="WVWZZZAUZGP123456" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(128,128,128,0.3); background: var(--md-default-bg-color--lightest); color: var(--md-default-fg-color); margin-bottom: 1rem; font-family: var(--md-code-font);">

    <label for="vcrn" style="display: block; font-weight: bold; margin-bottom: 0.5rem;">VCRN: <span style="color: red;" aria-hidden="true">*</span></label>
    <input type="text" id="vcrn" required aria-required="true" class="md-input" placeholder="VCRN" maxlength="10" value="abcdef1234" style="width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(128,128,128,0.3); background: var(--md-default-bg-color--lightest); color: var(--md-default-fg-color); margin-bottom: 2rem; font-family: var(--md-code-font);">

    <h3>Funktionen (FEC) auswählen</h3>
    <div style="max-height: 400px; overflow-y: auto; padding-right: 1rem;">
      <ul style="list-style: none; padding: 0; margin: 0;">
        <li style="margin-bottom: 0.5rem;"><label><input type="checkbox" class="fec-checkbox" value="00030000" data-name="00030000 - AMI (USB)"> 00030000 - AMI (USB)</label></li>
        <li style="margin-bottom: 0.5rem;"><label><input type="checkbox" class="fec-checkbox" value="00030001" data-name="00030001 - Gracenote"> 00030001 - Gracenote</label></li>
        <li style="margin-bottom: 0.5rem;"><label><input type="checkbox" class="fec-checkbox" value="00040100" data-name="00040100 - Navigation"> 00040100 - Navigation</label></li>
        <li style="margin-bottom: 0.5rem;"><label><input type="checkbox" class="fec-checkbox" value="00050000" data-name="00050000 - Bluetooth"> 00050000 - Bluetooth</label></li>
        <li style="margin-bottom: 0.5rem;"><label><input type="checkbox" class="fec-checkbox" value="00060100" data-name="00060100 - Vehicle Data Interface"> 00060100 - Vehicle Data Interface</label></li>
        <li style="margin-bottom: 0.5rem;"><label><input type="checkbox" class="fec-checkbox" value="00060200" data-name="00060200 - AudiConnect / VW CarNet"> 00060200 - AudiConnect / VW CarNet</label></li>
        <li style="margin-bottom: 0.5rem;"><label><input type="checkbox" class="fec-checkbox" value="00060300" data-name="00060300 - MirrorLink"> 00060300 - MirrorLink</label></li>
        <li style="margin-bottom: 0.5rem;"><label><input type="checkbox" class="fec-checkbox" value="00060400" data-name="00060400 - Performance Monitor"> 00060400 - Performance Monitor</label></li>
        <li style="margin-bottom: 0.5rem;"><label><input type="checkbox" class="fec-checkbox" value="00060500" data-name="00060500 - Porsche SportChrono"> 00060500 - Porsche SportChrono</label></li>
        <li style="margin-bottom: 0.5rem;"><label><input type="checkbox" class="fec-checkbox" value="00060800" data-name="00060800 - Apple CarPlay"> 00060800 - Apple CarPlay</label></li>
        <li style="margin-bottom: 0.5rem;"><label><input type="checkbox" class="fec-checkbox" value="00060900" data-name="00060900 - Google AndroidAuto"> 00060900 - Google AndroidAuto</label></li>
        <li style="margin-bottom: 0.5rem;"><label><input type="checkbox" class="fec-checkbox" value="00060F00" data-name="00060F00 - DAB full"> 00060F00 - DAB full</label></li>
        <li style="margin-bottom: 0.5rem;"><label><input type="checkbox" class="fec-checkbox" value="00070100" data-name="00070100 - VoiceControl (SDS)"> 00070100 - VoiceControl (SDS)</label></li>
        <li style="margin-bottom: 0.5rem;"><label><input type="checkbox" class="fec-checkbox" value="00070400" data-name="00070400 - Electronic Voice Amplifier (ICC)"> 00070400 - Electronic Voice Amplifier (ICC)</label></li>
        <hr style="margin: 1rem 0;">
        <li style="margin-bottom: 0.5rem;"><label><input type="checkbox" class="fec-checkbox" value="07400008" data-name="07400008 - Maps Seat MIB2 Std Eu"> 07400008 - Maps Seat MIB2 Std Eu</label></li>
        <li style="margin-bottom: 0.5rem;"><label><input type="checkbox" class="fec-checkbox" value="08400008" data-name="08400008 - Maps Skoda MIB2 Std Eu"> 08400008 - Maps Skoda MIB2 Std Eu</label></li>
        <li style="margin-bottom: 0.5rem;"><label><input type="checkbox" class="fec-checkbox" value="09400008" data-name="09400008 - Maps VW MIB2 Std Eu"> 09400008 - Maps VW MIB2 Std Eu</label></li>
        <hr style="margin: 1rem 0;">
        <li style="margin-bottom: 0.5rem;"><label><input type="checkbox" class="fec-checkbox" value="FFFFFFF9" data-name="FFFFFFF9 - Clear all FECs"> FFFFFFF9 - Clear all FECs</label></li>
      </ul>
    </div>
  </div>

  <!-- Right Column: Output -->
  <div>
    <h3 style="margin-top: 0;">Generierte Codes</h3>
    <div style="display: flex; gap: 1rem; margin-bottom: 1rem;">
      <div id="avin" style="flex: 1; display: none;"></div>
      <div id="avcrn" style="flex: 1; display: none;"></div>
    </div>
    
    <div id="no-codes-message" style="background: rgba(128,128,128,0.1); padding: 2rem; border-radius: 12px; text-align: center; color: var(--md-default-fg-color--light);">
      Bitte wähle mindestens einen FEC Code aus der Liste links.
    </div>

    <div id="codes-container">
      <!-- Codes rendered via JS -->
    </div>
  </div>

</div>

<script src="../../javascripts/fec.js"></script>
