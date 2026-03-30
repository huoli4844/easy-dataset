"""
Script di traduzione automatica per easy-dataset
Traduce il file di localizzazione dal turco all'italiano
"""

import json
import re
from pathlib import Path
from deep_translator import GoogleTranslator
import time

# Configurazione percorsi
TR_FILE = Path(r"D:\Progetti_AI\easy-dataset\locales\tr\translation.json")
IT_FILE = Path(r"D:\Progetti_AI\easy-dataset\locales\it\translation.json")

def translate_value(text, translator):
    """
    Traduce un testo preservando i placeholder e la formattazione
    """
    if not isinstance(text, str) or not text.strip():
        return text
    
    # Non tradurre se contiene solo codici o variabili
    if text.startswith('{') and text.endswith('}'):
        return text
    
    # Non tradurre URL
    if text.startswith('http://') or text.startswith('https://'):
        return text
    
    # Preserva i placeholder come {variable}, {{variable}}, {count}
    placeholders = re.findall(r'\{[^}]+\}', text)
    temp_text = text
    placeholder_map = {}
    
    for i, ph in enumerate(placeholders):
        placeholder_key = f'PLACEHOLDER{i}'
        placeholder_map[placeholder_key] = ph
        temp_text = temp_text.replace(ph, placeholder_key)
    
    try:
        # Traduci il testo
        translated = translator.translate(temp_text)
        
        # Ripristina i placeholder
        for key, value in placeholder_map.items():
            translated = translated.replace(key, value)
        
        return translated
    
    except Exception as e:
        print(f"  ❌ Errore: {str(e)[:50]}")
        return text  # Ritorna l'originale in caso di errore

def translate_dict(obj, translator, path="", indent=0):
    """
    Traduce ricorsivamente un dizionario preservando la struttura
    """
    prefix = "  " * indent
    
    if isinstance(obj, dict):
        result = {}
        for key, value in obj.items():
            current_path = f"{path}.{key}" if path else key
            result[key] = translate_dict(value, translator, current_path, indent + 1)
        return result
    
    elif isinstance(obj, str):
        if len(obj) > 100:
            print(f"{prefix}📝 {path[:60]}...")
        else:
            print(f"{prefix}📝 {path}: {obj[:40]}...")
        
        translated = translate_value(obj, translator)
        
        # Aggiungi un piccolo delay per evitare rate limiting
        time.sleep(0.1)
        
        return translated
    
    else:
        return obj

def main():
    print("=" * 70)
    print("🇮🇹 EASY-DATASET - TRADUZIONE AUTOMATICA ITALIANO")
    print("=" * 70)
    print()
    
    # Verifica esistenza file sorgente
    if not TR_FILE.exists():
        print(f"❌ Errore: File turco non trovato in {TR_FILE}")
        return
    
    print(f"📖 Lettura file turco: {TR_FILE}")
    with open(TR_FILE, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print(f"✅ File caricato: {len(data)} sezioni principali")
    print()
    
    # Sostituzioni manuali per la sezione language
    print("🔧 Applicazione sostituzioni per la lingua italiana...")
    if 'language' in data:
        # Modifica la sezione language
        if 'switchToTurkish' in data['language']:
            del data['language']['switchToTurkish']
        data['language']['switchToItalian'] = "Passa all'italiano"
        
        if 'tr' in data['language']:
            del data['language']['tr']
        data['language']['it'] = 'IT'
        
        data['language']['switchToEnglish'] = "Passa all'inglese"
        data['language']['switchToChinese'] = "Passa al cinese"
        data['language']['en'] = 'EN'
        data['language']['zh'] = '中'
    
    print("✅ Sezione 'language' aggiornata")
    print()
    
    # Inizializza il traduttore
    print("🌐 Inizializzazione traduttore Google (turco → italiano)...")
    translator = GoogleTranslator(source='tr', target='it')
    print("✅ Traduttore pronto")
    print()
    
    # Traduci tutto il resto
    print("🔄 INIZIO TRADUZIONE AUTOMATICA")
    print("   (Questo richiederà diversi minuti...)")
    print("-" * 70)
    
    translated_data = {}
    total_sections = len(data)
    
    for i, (key, value) in enumerate(data.items(), 1):
        print(f"\n[{i}/{total_sections}] Sezione: {key}")
        translated_data[key] = translate_dict(value, translator, key, indent=1)
    
    print()
    print("-" * 70)
    print("✅ TRADUZIONE COMPLETATA")
    print()
    
    # Crea la directory se non esiste
    IT_FILE.parent.mkdir(parents=True, exist_ok=True)
    
    # Salva il file
    print(f"💾 Salvataggio file italiano: {IT_FILE}")
    with open(IT_FILE, 'w', encoding='utf-8') as f:
        json.dump(translated_data, f, ensure_ascii=False, indent=2)
    
    file_size = IT_FILE.stat().st_size / 1024
    print(f"✅ File salvato con successo!")
    print(f"📊 Dimensione: {file_size:.2f} KB")
    print()
    print("=" * 70)
    print("🎉 TRADUZIONE COMPLETATA CON SUCCESSO!")
    print("=" * 70)
    print()
    print("📝 Prossimi passi:")
    print("   1. Verifica il file generato in:")
    print(f"      {IT_FILE}")
    print("   2. Controlla manualmente alcune traduzioni chiave")
    print("   3. Configura l'app per usare la lingua italiana")
    print()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⚠️  Traduzione interrotta dall'utente")
    except Exception as e:
        print(f"\n\n❌ ERRORE: {e}")
        import traceback
        traceback.print_exc()
