using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Button : MonoBehaviour
{


    [SerializeField]

    float time;
    [SerializeField]
    public LeanTweenType type;




    // Start is called before the first frame update
    void Start()
    {

        LeanTween.moveY(gameObject, 10f, 1f).setEase(type);
        LeanTween.moveX(gameObject, 10f, 1f).setEase(type);

    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
