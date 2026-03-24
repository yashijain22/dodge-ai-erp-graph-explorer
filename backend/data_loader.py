import pandas as pd
import os


def load_folder(folder_path):

    files = os.listdir(folder_path)
    dfs = []

    for file in files:
        if file.endswith(".jsonl"):
            df = pd.read_json(
                os.path.join(folder_path, file),
                lines=True
            )
            dfs.append(df)

    return pd.concat(dfs, ignore_index=True)