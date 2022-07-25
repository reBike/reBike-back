import torch
import os 

def get_ai_result(instance):
    hubconfig = os.path.join(os.getcwd(), 'rebiketrash', 'yolov5')
    weightfile = os.path.join(os.getcwd(), 'rebiketrash', 'yolov5',
                              'runs', 'train', 'garbage_yolov5s_results', 'weights', 'best.pt')
    model = torch.hub.load(hubconfig, 'custom',
                           path=weightfile, source='local')
    results = model(instance)
    results_dict = results.pandas().xyxy[0].to_dict(orient="records")
    if not results_dict:
        return 0
    return results_dict[0].get('name')