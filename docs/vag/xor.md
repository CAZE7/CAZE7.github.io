---
hide:
  - toc
---
# XOR Calculator

Dieser Rechner wird verwendet, um das Firmware-Update eines VW-Infotainmentsystems (Block 5F) zu bestätigen. Nach einem Update kann der Fehler `1555 / B201A – Rückmeldung zur Änderung der Einbauprüfung` auftreten.

### So bestätigst du das Firmware-Update:
1. **Lese den Code aus der Anpassung aus:**
    ```yaml
    Steuergerät 5F (Informationselektronik) → Anpassung:
    Kanal: Bestätigung der Einbauänderung
    ```
2. **Gib den Code in den Rechner ein**, um den Bestätigungscode zu generieren.
3. **Schreibe den Code in die Anpassung zurück:**
    ```yaml
    Steuergerät 5F → Anpassung:
    Kanal: Bestätigung der Einbauänderung: [Dein generierter Code]
    → Ausführen / Speichern
    ```

---

<div class="md-grid cards" style="margin-top: 2rem;">
  <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(128,128,128,0.2); border-radius: 12px; padding: 2rem;">
    
    <label for="origCode" style="display: block; font-weight: bold; margin-bottom: 0.5rem;">Originaler Code aus VCDS/ODIS: <span style="color: red;" aria-hidden="true">*</span></label>
    <div style="display: flex; gap: 1rem; align-items: center; margin-bottom: 2rem;">
      <input type="text" id="origCode" name="origCode" class="md-input" required aria-required="true" style="flex: 1; padding: 0.75rem; border-radius: 8px; border: 1px solid rgba(128,128,128,0.3); background: var(--md-default-bg-color--lightest); color: var(--md-default-fg-color); font-family: var(--md-code-font);" placeholder="Gib den HEX Code ein...">
      <button class="md-button md-button--primary" type="button" onClick="calculateXor()" aria-label="Bestätigungscode generieren" style="margin: 0;">Generieren</button>
      <button class="md-button" type="button" onClick="clearAll()" aria-label="Eingaben löschen" style="margin: 0;">Löschen</button>
    </div>

    <label for="calcCode" style="display: block; font-weight: bold; margin-bottom: 0.5rem; color: var(--md-primary-fg-color);">Generierter Bestätigungscode:</label>
    <div style="display: flex; gap: 1rem; align-items: center;">
      <input type="text" id="calcCode" name="calcCode" readonly aria-readonly="true" style="flex: 1; padding: 0.75rem; border-radius: 8px; border: 1px solid var(--md-primary-fg-color); background: rgba(79, 70, 229, 0.05); color: var(--md-primary-fg-color); font-family: var(--md-code-font); font-weight: bold; font-size: 1.2em; text-align: center;">
      <button id="copyBtn" class="md-button" type="button" onClick="copyResult()" aria-label="Code kopieren" style="margin: 0; display: none;">Kopieren</button>
    </div>

  </div>
</div>

<script src="../../javascripts/xor.js"></script>
